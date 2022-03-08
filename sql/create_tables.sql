-- CREATE POSTS TABLE
-- Every table needs a primary key

DROP TABLE IF EXISTS posts;
CREATE TABLE IF NOT EXISTS posts (
   postId SERIAL PRIMARY KEY,
   userId INT NOT NULL,
   title VARCHAR(255) NOT NULL,
   body VARCHAR(1000) NOT NULL
);