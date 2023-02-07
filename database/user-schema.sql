DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id serial PRIMARY KEY,
    userName VARCHAR(15),
    password TEXT,
    admin_acess BOOL
);