# Group chat messenger - LHL final project

## Business case

  Within two weeks build a clone of Discord as a web applicaton that allows users to communicate in different groups and pear-to-pear, including possibility to host video calls.

## Goal

  Build an application from start to finish using a tech stack of your choosing
  Design and architect a complete application
  Leverage all of the skills and knowledge learned throughout Bootcamp
  Practice creating functional requirements, user stories, and wireframes
  Stretch: Deploy the application to the cloud - must have in our case


## Scope

  A real-time chat web application MDP using WebSockets/webRTC. Modeled after discord and zoom, users will be able to register an account and search public groups/chatrooms to join and hangout, or search for other users and message them directly. 
  
  A chatroom can have text channels as well as channels for video and audiocalls that chatroom members can join and leave freely. Video calls can be hosted by users and hosts can send a link to other users allowing other users to join  the chat, or even giving a one time key to allow visitors to join in the chat as well (not clear enough!!!).

  The owner of a group can set a group to public or private, public groups are listed on the homepage, private groups require a link to join/find

  Each text channel in each chatroom schould have a message history that loads messages from the database and updates in realtime. Users can edit or delete their own messsages.
  
  Any user can be kicked from a group by a group owner and their messages are automatically(owner's choice?) deleted
  The user that owns a room/group has the power to add users, remove users, delete comments and moderate members. 
  
  The admin user can create and delete channels within a group // Do we still keep this feature?
 

  Notifications????
  Needs a discussion!

  Assumptions 

  Direct messaging is a messaging within a group of two users only ???
  This is NOT a production ready application, so no behavior under critical load was predicted and no security protection to the personal information while using the application is guaranteed. 

## Stack/technologies

  NodeJS
  ExpressJs
  PostgreSQL
  React
  Sass
  Technologies
  - WebSockets
  - WebRTC
  Libraries
  - bcryptjs
  - nodemon
  - cookie-session(if we use cookies)
  - axios
  Firebase/Heroku/AWS ???

## Plan

  Daily meetings in Discord for reviewing a progress at certain time???
  Never start coding without picking a user story from a list of stories ???
  Push and merge git requests rules ??? 
  Tasks distribution ???

  [x] Git repo Setup
  [] Project scaffold
  [] User stories - by the end of Thursday, Feb 10
  [] ERD - 
  [] Routes - 
  [] Wireframes/Views - 
  [] Database setup - 
  [] Seeds
  [] Queries -
  [] Backend -
  [] Frontend - 
  [] Cloud deploy - 2 days before D-day
  [] Presentation prep - D-day minus 1

## Team

  [Emily Waters](https://github.com/Emily-Waters),
  [Haris Rizwan](https://github.com/harisrizwan1),
  [Vladimir Eremenko](https://github.com/Vlad-Lab319)

## Major risks

  WebRTC implementation
  Feature for inviting unregistered users 