-- migrate:up
CREATE TABLE card_numbers(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  card_number VARCHAR(50) NOT NULL,
  CONSTRAINT card_numbers_user_id_FK FOREIGN KEY (user_id) REFERENCES users(id)
);

-- migrate:down
DROP TABLE card_numbers;