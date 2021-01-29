# Social - Social Media App
## Live Site Link
https://merng-social-leighton.netlify.app/

## Project Aim

The project's aim was to familirise myself with a the production stack MERNG (MongoDB, Express, React, Node, Graphql). I have experience with a MERN stack. However, I felt that the API could be more front end friendly for developers so I decided to add Graphql into the mix. Having a seperate backend was to make it so I could build a React and React Native front end without having to reuse any back end code.

This is the Express, Node, MongoDB backend of the project so we will focus on that. For the front end you can visit https://github.com/leightonvanrooijen/merng-social-client.

## Main App Focus

#### Simple to access API
  * Mongoose
    * Schemas and models on top of a MongoDB database
    * Flexiable API
  * Graphql
    * API query language
    * Single point of entry
    * I can query only the data I need saving time and bandwidth
    * Queriers are very simple once setup
#### User Authentication and Secure Data
  * Bcryptjs
    * Industry grade
    * Password hashing and salting to keep passwords secure from the moment they are registered
    * Adds 'Salt' which is random data added to the input of the hashed data
  * JSON Web Token
    * Standard for securely transmitting data between two parties
    * This is used to give access to specific functions for each user e.g Only display the delete button for posts/comments that the user did
<br />
## Technologies

  * Node
  * Express
  * MongoDB
  * GraphQl
  * JavaScript
  * Node Package Manager
  * Mongoose
  * JSON Web Token
  * Bcryptjs
<br />
For a more detailed decription check the dependeies in the package.json
<br />

## Lauch Project
  open the folder in terminal <br />
  npm install <br />
  npm start <br />
<br />

## Getting Started with Create React App

This project was bootstrapped with [Create React App] to learn the available scripts go here (https://github.com/facebook/create-react-app).

