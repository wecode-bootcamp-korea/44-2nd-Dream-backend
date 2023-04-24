-- migrate:up
CREATE TABLE addressses(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  address VARCHAR(200) NOT NULL,
  CONSTRAINT addresses_user_id_FK FOREIGN KEY (user_id) REFERENCES users(id)
);

-- migrate:down
DROP TABLE addresses;