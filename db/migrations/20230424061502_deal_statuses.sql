-- migrate:up
CREATE TABLE deal_statuses(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20) NOT NULL
);
INSERT INTO deal_statuses(
  name
) VALUE ('거래 체결'), ('결제 대기'), ('결제 완료'), ('배송 중'), ('배송 완료');

-- migrate:down
DROP TABLE deal_statuses;