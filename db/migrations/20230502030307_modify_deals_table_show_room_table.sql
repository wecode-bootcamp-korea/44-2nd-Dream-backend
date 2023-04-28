-- migrate:up
ALTER TABLE buyings ADD address_id INT;
ALTER TABLE buyings ADD CONSTRAINT buyings_address_id_FK FOREIGN KEY (address_id) REFERENCES addressses(id);
ALTER TABLE addressses ADD  detail_address VARCHAR(50) NULL;
ALTER TABLE addressses ADD receiver VARCHAR(50) NULL;
-- migrate:down

