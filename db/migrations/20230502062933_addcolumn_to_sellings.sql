-- migrate:up
ALTER TABLE sellings
ADD card_number_id INT,
ADD account_number_id INT,
ADD CONSTRAINT sellings_card_id_FK FOREIGN KEY(card_number_id) REFERENCES card_numbers(id),
ADD CONSTRAINT sellings_account_id_FK FOREIGN KEY(account_number_id) REFERENCES account_numbers(id)
-- migrate:down

