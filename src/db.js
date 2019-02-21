const Sequelize = require('sequelize');

// DB config
const { dbHost, dbName, dbPass, dbPort, dbUser } = require('./config');

// DB instance
const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  port: dbPort,
  dialect: 'postgres',
  operatorsAliases: false,
});

// -------------------------------------------------------------
// Users Schema
// -------------------------------------------------------------
const Users = sequelize.define('users', {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  created_at: { type: Sequelize.DATE, default: Date.now() },
  name: { type: Sequelize.STRING },
}, { timestamps: false });

// -------------------------------------------------------------
// Companies Schema
// -------------------------------------------------------------
const Companies = sequelize.define('companies', {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  created_at: { type: Sequelize.DATE, default: Date.now() },
  name: { type: Sequelize.STRING },
}, { timestamps: false });

// -------------------------------------------------------------
// Listings Schema
// -------------------------------------------------------------
const Listings = sequelize.define('listings', {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  created_at: { type: Sequelize.DATE, default: Date.now() },
  created_by: {
    type: Sequelize.INTEGER,
    references: {
      model: Users,
      key: 'id',
    },
  },
  name: { type: Sequelize.STRING },
  description: { type: Sequelize.TEXT },
}, { timestamps: false });

// -------------------------------------------------------------
// Teams Schema
// -------------------------------------------------------------
const Teams = sequelize.define('teams', {
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Users,
      key: 'id',
    },
    primaryKey: true,
  },
  company_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Companies,
      key: 'id',
    },
    primaryKey: true,
  },
  contact_user: { type: Sequelize.BOOLEAN, default: false },
}, { timestamps: false });

// -------------------------------------------------------------
// Application Schema
// -------------------------------------------------------------
const Applications = sequelize.define('applications', {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  created_at: { type: Sequelize.DATE, default: Date.now() },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Users,
      key: 'id',
    },
  },
  listing_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Listings,
      key: 'id',
    },
    primaryKey: true,
  },
  cover_letter: { type: Sequelize.TEXT },
}, { timestamps: false });

// -------------------------------------------------------------
// Table relationships
// -------------------------------------------------------------
Users.hasMany(Applications, { foreignKey: 'user_id' });
Users.hasMany(Teams, { foreignKey: 'user_id' });
Users.hasMany(Listings, { foreignKey: 'created_by' });
Applications.belongsTo(Listings, { foreignKey: 'listing_id' });
Teams.belongsTo(Companies, { foreignKey: 'company_id' });
// -------------------------------------------------------------

module.exports = {
  sequelize,
  Applications,
  Companies,
  Listings,
  Teams,
  Users,
};
