const {
  sequelize, Applications, Companies, Listings, Teams, Users,
} = require('./db');

/**
 * Get the top active users (paginated method)
 * @param page The page number to get, index starts at 1 (default: 1)
 * @param days The number of days until to consider activities (default: 7)
 * @param limit The number of records to fetch per page (default: 2)
 * @return {Promise<Array<Users>>} Array of users
 */
async function getTopActiveUsers(page = 1, { days = 7, limit = 2 } = {}) {
  return Users
    .findAll({
      // pagination
      limit,
      offset: limit * (page - 1),

      // attributes for the users
      attributes: [
        'id',
        'name',
        // rename the created_at field
        ['created_at', 'createdAt'],
        // get the count of most recent applications
        [
          sequelize.literal(`(SELECT COUNT(*) FROM applications WHERE applications.user_id = users.id AND applications.created_at >= now() - interval '${days} days')`),
          'count',
        ],
      ],

      // table join
      include: [
        {
          model: Listings,
          attributes: ['name', ['created_at', 'createdAt']],
        },
      ],

      // sort the results based on count and then the listings by date
      order: [
        sequelize.literal('count DESC'),
        [Listings, 'created_at', 'DESC'],
      ],
    })
    .then(users => users.map((u) => {
      const user = u.toJSON();

      // since the result spec needs only top 3 listing names,
      // we accordingly remap the values and take the slice of the array
      return {
        ...user,
        listings: user.listings.map(l => l.name).slice(0, 2),
      };
    }));
}

/**
 * Handler for /topActiveUsers?page=<page-number>
 * @param req Express request object
 * @param res Express response object
 * @return {Promise<*|void>}
 */
exports.getTopActiveUsers = async (req, res) => {
  const { page } = req.query;

  try {
    const users = await getTopActiveUsers(page);

    return res.send(users);
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};

/**
 * Get user info
 * @param userId The unique user id (required)
 * @return {Promise<Users>} The user details
 */
async function getUserInfo(userId) {
  return Users
    .findAll({
      subQuery: false,
      where: { id: userId },
      limit: 1,

      // get these attributes from users table, and rename the created_at to createdAt
      attributes: ['id', 'name', ['created_at', 'createdAt']],

      // table joins
      include: [
        {
          model: Teams,
          attributes: [
            ['contact_user', 'isContact'],
          ],
          // inner table join
          // companies is not related to users hence we need to get this through the teams
          include: [{
            model: Companies,
            attributes: ['id', 'name', ['created_at', 'createdAt']],
          }],
        },
        {
          model: Listings,
          attributes: ['id', 'name', 'description', ['created_at', 'createdAt']],
        },
        {
          model: Applications,
          attributes: ['id', ['created_at', 'createdAt'], ['cover_letter', 'coverLetter']],
          // since listings <-> applications has one-to-one relationship,
          // this will automatically be an object called listing (singular)
          include: [{
            model: Listings,
            attributes: ['id', 'name', 'description'],
          }],
        },
      ],
    })
    .then(users => users.map((u) => {
      const user = u.toJSON();

      // since the output spec expects companies property instead of teams
      // and createdListings instead of listings,
      // we remap the values
      user.companies = user.teams.map(c => ({
        ...c.company,
        isContact: c.isContact,
      }));

      user.createdListings = user.listings;

      // delete the redundant fields
      delete user.teams;
      delete user.listings;

      return user;
    })[0]); // finally, since we are limitting to one user, get the first array object
}

/**
 * Handler for /users?id=<user-id>
 * @param req Express request object
 * @param res Express response object
 * @return {Promise<*|void>}
 */
exports.getUserInfo = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).send({ error: 'id is required' });
  }

  try {
    const userInfo = await getUserInfo(id);

    return res.send(userInfo);
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};
