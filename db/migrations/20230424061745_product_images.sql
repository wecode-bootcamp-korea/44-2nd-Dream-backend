-- migrate:up
CREATE TABLE product_images(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  url VARCHAR(2000) NOT NULL,
  product_id INT NOT NULL,
  CONSTRAINT product_images_product_id_FK FOREIGN KEY(product_id) REFERENCES products(id)
);


-- migrate:down
DROP TABLE product_images;