-- migrate:up
CREATE TABLE search_keywords(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  keyword VARCHAR(200) NOT NULL UNIQUE,
  count INT NOT NULL DEFAULT 1
);

-- migrate:down
DROP TABLE search_keywords
