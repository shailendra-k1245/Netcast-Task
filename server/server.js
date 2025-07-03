const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/employee', employeeRoutes);


/*function listRoutes() {
  console.log('\nRegistered API Routes:');
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      const method = Object.keys(middleware.route.methods)[0].toUpperCase();
      const path = middleware.route.path;
      console.log(`${method}  ${path}`);
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach((handler) => {
        const route = handler.route;
        if (route) {
          const method = Object.keys(route.methods)[0].toUpperCase();
          const basePath = middleware.regexp.toString()
            .replace(/^\/\^\\/, '/')
            .replace(/\\\/\?\(\?\=\\\/\|\$\)\/i$/, '')
            .replace(/\\/g, '');
          const fullPath = basePath + route.path;
          console.log(`${method}  ${fullPath}`);
        }
      });
    }
  });
} */

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
