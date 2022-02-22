DROP TABLE IF EXISTS seen_messages CASCADE;
CREATE TABLE seen_messages (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  room_id INTEGER REFERENCES rooms(id),
  private_room_id INTEGER REFERENCES private_rooms(id),
  messages_seen INTEGER
);