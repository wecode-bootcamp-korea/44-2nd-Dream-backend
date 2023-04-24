-- migrate:up
CREATE TABLE buyings(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  bid_price DECIMAL(20, 2),
  bid_status_id INT NOT NULL,
  due_date DATETIME,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT buyings_user_id_FK FOREIGN KEY(user_id) REFERENCES users(id),
  CONSTRAINT buyings_product_id_FK FOREIGN KEY(product_id) REFERENCES products(id)
);

-- migrate:down
DROP TABLE buyings;
