## /users

GET /users

- get all users

POST /users

- add new users

GET /users/:id

- get specific user

GET /users/:id/friends

- get friends of current user

POST /users/:id/friends

- add new friends

## /rooms

GET /rooms

- get all rooms

POST /rooms

- add new room

GET /rooms/:id

- get specific room

GET /rooms/:id/members

- get all members in a specific room

POST /rooms/:id/members

- add new members to group

GET /rooms/:id/blacklist

- get all members blacklisted from a specific room

POST /rooms/:id/blacklist

- add new members to blacklist

GET /rooms/:id/channels

- get all channels in a specific room

POST /rooms/:id/channels

- add new channel

GET /rooms/:id/channels/:id

- get specific channel

GET /rooms/:id/channels/:id/messages

- get all messages from a specific channel

POST /rooms/:id/channels/:id/messages

- add new message

GET /rooms/:id/channels/:id/messages/:id

- get specific message
