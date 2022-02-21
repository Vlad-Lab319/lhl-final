DROP TABLE IF EXISTS private_room_users CASCADE;
CREATE TABLE private_room_users (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  private_room_id INTEGER REFERENCES private_rooms(id) ON DELETE CASCADE
);