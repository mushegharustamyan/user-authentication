# Documentation 

## Overview

This document provides informations about the server and its endpoints

## Server details

- **Server Type:** Node.js
- **Framework:** Express.js
- **Database:** MySQL

### Install project dependencies
`npm install`

To run the server, you need an .env file. You can create one by copying the .env.example file provided.

### Run development server
`npm run dev`

### Run server
`npm start`

---

## Endpoints

### Authentication and Authorization 

#### Register User

- **URL:** `http://localhost:port/auth/register`
- **Method:** POST
- **Description:** Registers a new user
- **Request Body:** `json {
    "email": "mymail@gmail.com",
    "firstName": "first name",
    "lastName": "last name",
    "password" : "mypassword"
}`

#### Responses

-  201 , Record Created
-  400 , Missing required fields
-  400 , Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character.;
-  409 , Email is already in use
-  500 , Error during registration

---

#### Sign In

- **URL:** `http://localhost:port/auth/signIn`
- **Method:** POST
- **Description:** authentication of user
- **Request Body:** `json {
    "email": "mymail@gmail.com",
    "password" : "mypassword"
}`

#### Responses

-  200 , `json { token }`
-  400 , Missing required fields
-  401 , Unauthorized
-  403 , Invalid token     
-  409 , Invalid email or password
-  409 , Error during auhtentication

---

#### User get own data

- **URL:** `http://localhost:port/user/show`
- **Method:** GET
- **Description:** Shows user own data
- **Request Headers:** `json {token}`


#### Responses

- 200 , `{id , firstName , lastName , email}`
- 403 , Invalid token
- 404 , Record not found

---

## Dependencies

- **mysql2:** Managing databes connections
- **sequelize:** Defining models for database tables and simplifies database operations
- **bcrypt:** Hashing passwords securely
- **jsonwebtoken:** Generating and verifying JSON Web Tokens (JWT)