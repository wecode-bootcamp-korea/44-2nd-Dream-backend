-- migrate:up
CREATE TABLE account_numbers(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  account_number VARCHAR(50) NOT NULL,
  CONSTRAINT account_numbers_user_id_FK FOREIGN KEY (user_id) REFERENCES users(id)
);

-- migrate:down
DROP TABLE account_numbers;