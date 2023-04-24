-- migrate:up
CREATE TABLE deals(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  buying_id INT NOT NULL,
  selling_id INT NOT NULL,
  buying_commission DECIMAL(20, 2),
  selling_commission DECIMAL(20, 2),
  deal_number VARCHAR(40) DEFAULT(UUID()),
  deal_status_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT deals_buying_id_FK FOREIGN KEY(buying_id) REFERENCES buyings(id),
  CONSTRAINT deals_selling_id_FK FOREIGN KEY(selling_id) REFERENCES sellings(id),
  CONSTRAINT deals_status_id_FK FOREIGN KEY(deal_status_id) REFERENCES deal_statuses(id)
);

-- migrate:down
DROP TABLE deals;