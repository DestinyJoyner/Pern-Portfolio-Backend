DROP TABLE IF EXISTS calendar_users;

CREATE TABLE calendar_users (
    id serial PRIMARY KEY,
    userName VARCHAR(15),
    password TEXT
);