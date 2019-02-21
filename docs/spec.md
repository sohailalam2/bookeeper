
# Endpoints

#### /topActiveUsers?page={pageNumber}

```
[
	{
		id: {users.id},
		createdAt: {users.created_at},
		name: {users.name},
		count: {count of applications in the past week's time}
		listings: [
			{listings.name},
			{listings.name},
			{listings.name}
		]
	},
	...
]
```

#### /users?id={user.id}

```
{
	id: {users.id},
	name: {users.name},
	createdAt: {users.created_at},
	companies: [
		{
			id: {companies.id},
			createdAt: {companies.created_at},
			name: {companies.name},
			isContact: {is user a contact_user for the company? boolean.}
		},
		...
	],
	createdListings: [
		{
			id: {listings.id},
			createdAt: {listings.created_at},
			name: {listings.name},
			description: {listings.description}
		},
		...
	],
	applications: [
		{
			id: {applications.id},
			createdAt: {applications.created_at},
			listing: {
				id: {listings.id},
				name: {listings.name},
				description: {listings.description}
			},
			coverLetter: {applications.cover_letter}
		},
		...
	]
}
```
