# LHL FINAL PROJECT - NAME TBD

```
Project Description
You should have a document describing your project idea. In other words, what your project
is all about.
It should contain at least the following:

Project title
Project description - What problem your app solves
Target audience - Your app will be useful to whom?
Team members

Deadline: Finished and reviewed by a mentor on week 10 day 5.
```

# **Description:**

1. This app enables users to communicate in realtime with one another through
   text chat, as well as video calls using websockets. Users can register an
   account, sign in and join rooms or create private conversations with other
   members. Visitors will also be able to join in on calls using a unique one
   time key provided to them by a registered user.

2. The target audience for this app is anyone who is looking to connect and chat
   with friends or coworkers remotely.

3. Group members [Github Links]:
   [Emily Waters](https://github.com/Emily-Waters),
   [Haris Rizwan](https://github.com/harisrizwan1),
   [Vladimir Eremenko](https://github.com/Vlad-Lab319)

---

# **User Stories**

## **As a user I can :**

- ### User to App Interaction

  - Register an account, with a username, email and password
  - Login with an existing account
  - Search for public rooms to join
  - Edit or delete my own messages
  - Leave a room and have the option of having my messages deleted
  - Create a room

- ### User To User Interaction
  - Chat with other users in a rooms channels
  - See persistent message history in a channel, updated in realtime
  - Search for other users (by username?email?)
  - Send friend requests to other users
  - Start a private conversation with other users
  - Make a video/audio call in a private message
  - Share a link to other users inviting them to join a room

## **As a room creator I can :**

- Create a public room (Public rooms are shown on the homepage)
- Create a private room (Private rooms are invite only, can only be found by
  invitation)
- Delete an entire room and all it's channels that I own
- Create channels in a chatroom
- Delete channels in a chatroom
- Delete individual messages in a channel
- Change a room I've created from public to private (Ideally, one way only)
- Moderate membership in the rooms I own (allow, mute, kick, ban)

### **Stretch**

- Join a video/audio call in a dedicated AV channel
- A user can add attachments like images or audio files in a chatroom or private
  message
- As a non registered user, I can join a hosted call if provided a unique one
  time key.

---

# **Wireframes**

```
Wireframes:
Wireframes are a visual representation of the skeletal structure of your app.
It should lay out the structure hierarchy and relationships between the different
element of your app. Ideally, you should use a simple design software to get your wireframes
done (draw.io, balsamiq, etc).

Deliverable: Wireframe designs
```

---

# **ERD**

```
Entity Relationship Diagram:
You need to design the database ERD and define what are the tables and their relationships.
You should use a design software (draw.io or any other) to draft the ERD.

Deliverable: ERD design
```

---

# **Stack**

- Front End - React
- Back End - NodeJS, ExpressJs
- Database - Postgres? GraphQL? MongoDB?
- Websocket - Socket.io?
- Libraries
  - bcryptjs
  - nodemon
  - cookie-session(if we use cookies)
  - axios

---

# **Setup**

```
Project Setup
To start off on the right foot, you’ll need a good project setup:

a) Git repo setup
Create a repo on GitHub and give access to all team members.

b) Project scaffold
If needed, you have to decide which boilerplate code you’re going to use for your project.

c) Database setup
You may need to create the database and the initial migration.

d) Seed file
You may need to create a seed file since the content of the database should never be part
of your repo.
Each team member will have to seed their local database.

Deliverable: Setup of your app
```

---

# **Workflow**

```
Project Communication
We highly recommend that your group implements a daily stand up which will allow better
communication and follow-up. You can appoint one member of your team to be
the "Stand Up Master", or you can ask a mentor to help lead your stand up meetings.
The stand up will allow to review:

What has been accomplished
What will you be working on
What hurdles are you facing
Deliverable: Daily stand up

Project Workflow
You need to take a few key decisions to ensure a smooth project workflow.
Ideally, you should think about the following:

What are the project milestones: you need to create a list of the project milestones and
specify what are the deadlines.
Git workflow: establish rules about how you’re going to manage your Git workflow.
You can discuss it with a mentor if needed.
How to distribute teamwork: before distributing work, you might want to consider
working together until you build the core of your app. Afterward, you need to think about
how you will distribute the work among your team members.
Coding styles: consider establishing some coding guidelines to ensure consistency between
team members.

Deliverable: Project milestones document
```

---

# **Project Development**

```
You should work on the development of your app according to your feature list and project
milestones. You should not develop any new features beyond week 11 day 5, since you need to
prepare for Demo Day.

Deadline: Week 11, day 5



Testing, bug fixing
Make sure you take time to test the functionalities of your app. You need to think about:

Testing, testing, testing
Fixing bugs
Refactoring your code
Cleaning up your code

Deadline: Demo Day minus 2
```

---

# **Project Deployment**

```
You should have a production-ready local version of your app for Demo Day.
Optionally, you might want to consider deploying your app on Heroku (or elsewhere).
However, you need to account for the extra time to deploy on Heroku (or again, elsewhere).
```

---

# **Project Presentation**

```
It’s important to take some time to structure the presentation of your app.

Who is the target audience:
You have 2 targets: Employers and the public. For prospective employers you should
focus on what you’ve accomplished, highlight - your skills, the technologies you used.
For the public, it’s more about the user experience.
You should have a script for the live demo. Optionally, you might want to consider
using a power point.
Audio/video setup: it’s important that you check your setup to ensure that everything works.
Presentation practice: It’s important to practice before Demo Day. You should practice in
front of a mentor so you can get some feedback.

Deadlines: - Practice Demo (with mentors): Demo Day minus 1 - Demo Day
```
