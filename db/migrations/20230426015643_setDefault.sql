-- migrate:up
ALTER TABLE buyings
ALTER COLUMN bid_status_id SET DEFAULT 1;

ALTER TABLE sellings
ALTER COLUMN bid_status_id SET DEFAULT 1;

ALTER TABLE deals
ALTER COLUMN deal_status_id SET DEFAULT 1;
-- migrate:down