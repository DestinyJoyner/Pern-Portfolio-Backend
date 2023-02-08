DROP TABLE IF EXISTS schedules;

CREATE TABLE schedules (
    id serial PRIMARY KEY,
    day_start TIMESTAMP,
    day_end TIMESTAMP,
    title TEXT,
    description TEXT,
    reoccurring BOOL,
    user_id INT NOT NULL,
    CONSTRAINT fk_users_user_id
    FOREIGN KEY (user_id) REFERENCES users(id) ON
    DELETE CASCADE
);
