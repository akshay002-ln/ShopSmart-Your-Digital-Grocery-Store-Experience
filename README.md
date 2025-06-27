# ShopSmart-Your-Digital-Grocery-Store-Experience
ShopSmart – Full-Stack Grocery Web App using Angular, Node.js, and MongoDB  A full-stack online grocery shopping platform with user-friendly UI, secure authentication, real-time product browsing, cart management, and admin control panel for managing products and orders.

# Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.0.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Install Dependencies
Run:
cd "Project Files/client"
npm install --legacy-peer-deps

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

# Server

This is the backend built with Node.js, Express, and MongoDB.

### Start the Server

Run:
cd "Project Files/server"
npm install
node src/app.js

Make sure MongoDB is running locally or connected via MongoDB Atlas.

### Features

- REST API with Express
- JWT-based Authentication for Users and Admin
- CRUD operations for products and orders
- Admin access to order and product management
- Email service using Nodemailer

---

# Project Structure

Project Files/
├── client/ → Angular Frontend
└── server/ → Node.js Backend

---

# Tech Stack

- Angular 16
- Bootstrap 5
- FontAwesome
- Node.js & Express
- MongoDB & Mongoose
- JSON Web Tokens (JWT)
- Nodemailer
- 
---

# Setup Note

After cloning this repository:

1. For frontend:
Run:
cd "Project Files/client"
npm install --legacy-peer-deps


2. For backend:
Run:
cd "../server"
npm install


Then run Angular (`ng serve`) and Node.js (`node src/app.js`) in separate terminals.

---

# License

This project is for educational/demonstration purposes only.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.



