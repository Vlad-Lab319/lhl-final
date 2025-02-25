DROP TABLE IF EXISTS rooms CASCADE;
CREATE TABLE rooms (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  invite_key VARCHAR(255),
  icon_url VARCHAR(255),
  is_private BOOLEAN DEFAULT false
);