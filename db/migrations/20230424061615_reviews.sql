-- migrate:up
CREATE TABLE reviews(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content TEXT NULL,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT reviews_user_id_FK FOREIGN KEY(user_id) REFERENCES users(id),
  CONSTRAINT reviews_product_id_FK FOREIGN KEY(product_id) REFERENCES products(id)
);


-- migrate:down
DROP TABLE reviews;
