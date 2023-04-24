-- migrate:up
CREATE TABLE bid_statuses(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20) NOT NULL
);
INSERT INTO bid_statuses(
  name
) VALUE ('입찰'), ('낙찰'), ('유찰');

-- migrate:down
DROP TABLE bid_statuses;