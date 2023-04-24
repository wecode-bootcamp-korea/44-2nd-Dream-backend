-- migrate:up
CREATE TABLE product_levels(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  level INT NOT NULL
);
INSERT INTO product_levels(
  level
)
VALUE (1), (2), (3), (4), (5);
-- migrate:down
DROP TABLE product_levels;