
insert into users (id, created_at, name) values
	(1, (now() - interval '175 days, 5 hours'), 'User 1'),
	(2, (now() - interval '154 days, 7 hours'), 'User 2'),
	(3, (now() - interval '124 days, 1 hours'), 'User 3'),
	(4, (now() - interval '101 days, 4 hours'), 'User 4'),
	(5, (now() - interval '89 days, 6 hours'), 'User 5'),
	(6, (now() - interval '75 days, 2 hours'), 'User 6')
;

insert into companies (id, created_at, name) values
	(1, (now() - interval '250 days'), 'Company 1'),
	(2, (now() - interval '300 days, 2 hours'), 'Company 2')
;

insert into teams (company_id, user_id, contact_user) values
	(1, 1, TRUE),
	(2, 3, FALSE),
	(2, 4, TRUE)
;

insert into listings (id, created_at, created_by, name, description) values
	(1, (now() - interval '170 days'), 1, 'User 1 | Listing 1', 'Description 1'),
	(2, (now() - interval '50 days'), 1, 'User 1 | Listing 2', 'Description 2'),
	(3, (now() - interval '10 days'), 2, 'User 2 | Listing 3', 'Description 3'),
	(4, (now() - interval '2 days'), 3, 'User 3 | Listing 4', 'Description 4'),
	(5, (now() - interval '200 days'), 3, 'User 3 | Listing 5', 'Description 5')
;

insert into applications (id, created_at, user_id, listing_id, cover_letter) values
	(1, (now() - interval '165 days'), 2, 1, 'User 2 | Listing 1 | Application 1'),
	(2, (now() - interval '70 days'), 2, 1, 'User 2 | Listing 1 | Application 2'),
	(3, (now() - interval '2 days'), 2, 2, 'User 2 | Listing 2 | Application 3'),
	(4, (now() - interval '45 days'), 2, 4, 'User 2 | Listing 4 | Application 4'),
	(5, (now() - interval '5 days'), 3, 2, 'User 3 | Listing 2 | Application 5'),
	(6, (now() - interval '7 days'), 3, 1, 'User 3 | Listing 1 | Application 6')
;
