# Book-Store-Project
This is a Backend API for a bookstore application with some functionality for admins. The API is built using Node.js and Express. To easily extend the app functionality, the project directory is structured as follows:
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
