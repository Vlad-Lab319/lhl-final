# bcrypt

## Install

Make sure to use the js version, regular bcrypt doesn't play nice with web apps

```
npm install bcryptjs
```

## Use

```javascript
// Encrypt
const bcrypt = require("bcryptjs");
const password = "purple-monkey-dinosaur";
bcrypt.hashSync(password, 10);

// Decrypt
bcrypt.compareSync("purple-monkey-dinosaur", hashedPassword);
// returns true
bcrypt.compareSync("pink-donkey-minotaur", hashedPassword);
// returns false
```

# **React**

[React Docs](https://create-react-app.dev/)
[Video conferencing with React](https://www.section.io/engineering-education/video-conferencing-app-with-react-node/)

# **Websockets** - Setting up a websocket connection in express and react

[Gary's websocket repo](https://github.com/gary-jipp/demo-websockets)

# **UDP** - Alternative to TCP for Video/Audio

[Article on UDP](<https://www.techtarget.com/searchnetworking/definition/UDP-User-Datagram-Protocol#:~:text=User%20Datagram%20Protocol%20(UDP)%20is,provided%20by%20the%20receiving%20party.>)

[Node Docs](https://nodejs.org/api/dgram.html) -
https://nodejs.org/api/dgram.html

[Tabnine Code Snippets](https://www.tabnine.com/code/javascript/modules/dgram)
