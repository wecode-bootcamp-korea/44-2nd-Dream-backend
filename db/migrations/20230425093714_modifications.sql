-- migrate:up
INSERT INTO categories(
  name
) VALUE ('Basic'), ('Car'), ('Movie'), ('Building');

-- migrate:down