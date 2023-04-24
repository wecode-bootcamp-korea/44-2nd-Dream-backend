-- migrate:up
CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  model_number VARCHAR(200) NOT NULL UNIQUE,
  category_id INT NOT NULL,
  product_age_id INT,
  product_level_id INT,
  original_price DECIMAL(20, 2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT products_category_id_FK FOREIGN KEY(category_id) REFERENCES categories(id),
  CONSTRAINT products_age_id_FK FOREIGN KEY(product_age_id) REFERENCES product_ages(id),
  CONSTRAINT products_level_id_FK FOREIGN KEY(product_level_id) REFERENCES product_levels(id)
);

-- migrate:down
DROP TABLE products;
