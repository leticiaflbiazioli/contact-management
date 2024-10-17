## Contact Management App - Backend

This project is a RESTful API developed with NestJS and integrated with MongoDB for managing user contacts. The API includes routes protected by JWT authentication and allows inserting, listing, updating, and deleting contacts with basic information like name, phone, and email.

### Funcionalidades Principais

- _Autenticação JWT_:
  Login route to authenticate users.

- _Contact Management (CRUD):_
  Insertion of new contacts.
  Listing of all registered contacts.
  Updating existing contacts.
  Deletion of contacts.

### Stack

- NestJS
- MongoDB
- Mongoose

### How to Run the Project

- _Prerequisites_
  Node.js installed (version 14 or higher).

- _Steps to Install and Run_

1. Clone the repository

2. Create the `.env` file based on `.env.example` (the keys can be sent to you by email, just request it by contacting lelima89@hotmail.com)

3. Install the dependencies:
  In the project directory, run:
  `cd api`
   `npm install`

4. MongoDB Configuration:
  Make sure MongoDB is running locally, or adjust the connection URL in the environment variable.

5. Start the server:
  To start the NestJS server, run:
  `npm run start`

The API will be available at: http://localhost:3000

### API Routes

1. Authentication

- _POST /auth/login_: Route to log in and obtain the JWT token. Use the following payload to authenticate:

```
{
"username": "userlogin",
"password": "password123"
}
```

Example response on success:

```
{
"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI..."
}
```

2. Contacts (protected by JWT)
   To access the routes below, you must include the JWT token in the Authorization header as Bearer token.

- _GET /contacts_: Returns the list of all registered contacts.
- _POST /contacts_: Adds a new contact. Example payload:

```
{
"name": "Ana",
"surname": "Smith",
"phone": "123456789",
"birthDate": "1990-01-01",
"address": "ABC street, 123",
"email": "ana.smith@example.com"
}
```

- _PUT /contacts/:id_: Updates an existing contact based on the provided ID. Example payload:

```
{
"name": "Ana",
"phone": "987654321"
}
```

- _DELETE /contacts/:id_: Deletes an existing contact based on the provided ID.
