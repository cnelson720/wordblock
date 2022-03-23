DROP TABLE IF EXISTS hiscores;

CREATE TABLE hiscores (
    name TEXT UNIQUE NOT NULL,
    wordScore INT,
    score INT
);