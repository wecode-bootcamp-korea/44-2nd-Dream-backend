-- migrate:up
CREATE TABLE product_ages(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  age INT NOT NULL
);
INSERT INTO product_ages(
  age
)
VALUE (4), (9), (18);
-- migrate:down
DROP TABLE product_ages;