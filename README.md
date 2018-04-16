# Simple create, login and update user boilerplate

## Table of content

- Node.js
- Express.js
- JWT
- Mongoose
- MongoDB
- Docker and Docker Compose

## Routes
Obs: Requests that need token, just pass a header called 'authorization' with token. 
Example: `{ headers: { 'authorization': 'TOKEN' } } `

- '/user'
  - GET: get user by token (need token)
  - POST: { name: STRING, password: STRING }: create user
  - PUT: { any user data }: Update user (need token)
- '/auth'
  - POST: { email: STRING, password: STRING }: login and generate user token
