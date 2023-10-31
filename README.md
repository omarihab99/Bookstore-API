
# Bookstore

This is a the backend for a bookstore web application that includes both customer and admin APIs.



## Design

To increase code readability and maintain clean architecture, the project directory is structured as follows:
```
├── README.md
├── package-lock.json
├── package.json
└── src
    ├── configs
    │   └── database.js
    ├── controllers
    │   ├── admins.controller.js
    │   ├── products.controller.js
    │   └── users.controller.js
    ├── index.js
    ├── middlewares
    │   ├── admins.middleware.js
    │   └── users.middleware.js
    ├── models
    │   ├── Admin.model.js
    │   ├── Category.model.js
    │   ├── Order.model.js
    │   ├── Product.model.js
    │   └── User.model.js
    ├── routes
    │   ├── admins.route.js
    │   └── users.route.js
    ├── services
    │   ├── admins.service.js
    │   ├── products.service.js
    │   └── users.service.js
    └── utils
```
This structure encourages the principle of "Separation of concerns" where each functionality, represented by its own function, resides in the file it belongs to. So, for example, if you want to add a new endpoint for products, you will make a the following steps:

    1. Write the necessary controller in products.controller.js file.
    2. Write its service function in products.services.js file.
So, controller file is necessary for request or response transformation before sending it and service file will query the database.
## Tech Stack

**Server:** Node, Express, MongoDB

**Database**: MongoDB, mongoose

## Run locally

To run the project locally:

```bash
npm run start
```
