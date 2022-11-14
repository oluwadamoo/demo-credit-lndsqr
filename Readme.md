# Demo Credit

### Introduction

Demo Credit is a mobile lending app that requires wallet functionality. This is needed as borrowers need a wallet to receive the loans they have been granted and also send the money for repayments.

### Demo Credit Features

- Users can signup and login to their accounts
- Authenticated users can fund their wallets, transfer funds to other user's wallet, withdraw their funds and also view their wallet details
- Authenticated Users can check all their transactions

### Installation Guide

- Clone this repository [here](https://github.com/oluwadamoo/demo-credit-lndsqr.git)
- Run yarn to install all dependencies
- Create an .env file in your project root folder and add your variables. see .env.example for assistance.

### Usage

- Run yarn start:dev to start the application.
- Connect to the API using Postman on port 8080.

### API Endpoints

| HTTP Verbs | Endpoints            | Action                                       |
| ---------- | -------------------- | -------------------------------------------- |
| POST       | /api/auth/register   | To sign up a new user account                |
| POST       | /api/auth/login      | To login an existing user account            |
| POST       | /api/wallet/funds    | To fund wallet                               |
| POST       | /api/wallet/transfer | To transfer money from one wallet to another |
| POST       | /api/wallet/withdraw | To withdraw money from a funded wallet       |
| GET        | /api/wallet          | To get wallet details                        |
| GET        | /api/transactions    | To get wallet transactions details           |

### Technologies Used

- [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.

- [Typescript](https://www.typescriptlang.org/) This s a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

- [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.

- [MySQL](https://www.mysql.com/) This is an open-source relational database management system (RDBMS). Data are stored in tabular format

- [KnexJS ORM](https://knexjs.org/) This is an SQL query builder for relational database, designed to be flexible, portable and fun to use.

### Author

- [Damilola Saliu](https://github.com/oluwadamoo)

### License

This project is available under the MIT Licence
