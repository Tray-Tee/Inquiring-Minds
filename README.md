# Inquiring-Minds

We have a working server that allows users with proper credentials to access our list of questions and answers to a fun and somewhat challenging JavaScript quiz! If a user signs up to our website they will be defaulted as a user, having the ability to read questions provided by our admins and editors. Admins/Editors are able to create, update, delete, and read questions/answers. These abilities and restrictions are provided through an access control list linked to our user model, which applies certain abilities to specific roles. That model is exported from our models and used on specific routes that link to another database we curated that has a mesh of question and answer model structures merged into a data-collection file. 

The server is deployed through Heroku, allowing the API to be hit beyond the command line interface. Once connected to a front-end, the ability to signup, log in and solve our quiz will be brought to life beyond testing suites!


# Installation

- Install [NPM](https://www.npmjs.com/) onto your command line
- Chose Code above the repo and enter this command into your terminal:
 
    `https://github.com/Tray-Tee/Inquiring-Minds.git`
- `cd Inquiring-minds`
- `npm install`

# Usage 

- Initialize the package via `npm start`

# Whiteboard Process 

![UML](https://user-images.githubusercontent.com/90294860/161465613-a4d88c27-2385-470a-ae54-8afd85ebc925.png)


# Features and Routes

- **THE SEQUELIZE MODEL STRUCTURES AND ROUTES --> `questions` and `/answers`** :

            const questionModel = (sequelize, DataTypes) => sequelize.define('Question', {
              name: { type: DataTypes.STRING, allowNull: false},
              questionID: { type: DataTypes.INTEGER, allowNull: false}
            });
            
            const answersModel = (sequelize, DataTypes) => sequelize.define('Question', {
              name: { type: DataTypes.STRING, allowNull: false},
              questionID: { type: DataTypes.INTEGER, allowNull: false}
            });

- Full CRUD functionality examples:
     - GET: `'/:model'` type is **required**
        - Queries: name: string
        - Response: status(200) successful response , status(400) `type = null`
     - GET One: `/:model/:id` type is **required**
        - Queries: name: string, { where: {id: 1} }
        - Response: status(200) successful response , status(400) `type = null`
     - POST:  `'/:model'` type is **required**
          - Queries: name: string, questionID: integer
         - Response: status(201) successful response , status(400) `type = null`
     - PUT:  '/:model/:id' type is **required**
         - Queries: name: string, questionID: integer, { where: {id: 1} }
         - Response: status(200) successful response , status(400) `type = null`
     - DELETE: '/:model/:id' type is **required**
         - Queries: name: string, { where: {id: 1} }
         - Response: status(200) successful response , status(400) `type = null`


## Middleware

- acl.js
    - this module exports to the route.js granting or denying access to routes based on a list of pre-determined user capabilities.
    - handles authorized signin (POST), signup (POST), and user data (GET). 
        - authRouter
- basic.js
    - this module exports to the route.js, requiring the headers authorization. 
    - decoding the username and password upon signin.
- bearer.js
    - this module exports to the route.js providing the bearer token to a validated user.

## Future aspects of the quiz
  - Creates a Server/Database that holds user information
    - Credentials
    - Previous Scores
    - ACL User/Editor/Admin
    - Quiz Question Schema/Model
    - User Schema/Model
  
  - Ability to utilize Authentication/Authorization
    - Sign Up / Sign In process


## Contributors
- Tee Brown
- Tray Chea


