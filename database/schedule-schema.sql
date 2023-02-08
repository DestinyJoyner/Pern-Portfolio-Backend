DROP TABLE IF EXISTS schedules;

CREATE TABLE schedules (
    id serial PRIMARY KEY,
    day_start TIMESTAMP NOT NULL,
    day_end TIMESTAMP,
    title TEXT NOT NULL,
    description TEXT,
    important BOOL,
    user_id INT NOT NULL,
    CONSTRAINT fk_users_user_id
    FOREIGN KEY (user_id) REFERENCES users(id) ON
    DELETE CASCADE
);


