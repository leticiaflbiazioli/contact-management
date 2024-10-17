## Contact Management Mobile App

This project is a frontend application developed in React Native to manage contacts. The app connects to a backend API built with Node.js and NestJS, allowing users to authenticate and manage their contacts.
_Important_:  Since the backend is running on a free and limited server, the first request may take a little longer due to the application startup, but subsequent requests should proceed normally.

### Stack

- React Native
- TypeScript
- Axios
- React Navigation

### How to Run the Project

- _Prerequisites_
  Ensure you have the following installed on your machine:

1. Node.js
2. React Native CLI
3. Android Studio
4. Dispositivo Android (optional)

- _Steps to Install and Run_

1. Clone the repository
2. Install dependencies:
   In the project directory, run:
   `cd frontMobile`
   `npm install`
3. Start the app:
   `npx react-native run-android`

### How to Use

- _Login_: When you open the app, you will see a login screen. Enter your username and password to authenticate. The access token will be stored for future API calls.

- _Manage Contacts_: After logging in, you can list, add, edit, or delete contacts. The contact addition fields include: Name, Surname, Phone, Date of Birth, Address, Email
