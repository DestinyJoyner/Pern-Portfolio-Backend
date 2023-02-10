DROP TABLE IF EXISTS schedules;

CREATE TABLE schedules (
    id serial PRIMARY KEY,
    day_start TIMESTAMP NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    important BOOL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON
    DELETE CASCADE
);

-- CONSTRAINT fk_users_user_id


