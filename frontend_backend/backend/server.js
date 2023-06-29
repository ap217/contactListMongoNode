// server.js
const express = require('express');
const app = express();
const port = 8001;

const cors = require('cors');
const bodyParser = require('body-parser');
const contactsRoutes = require('./contactsRoutes');
// const { connectToDatabase } = require('./database');
const { connectDatabase } = require('./database');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
// connectToDatabase();
connectDatabase();

// Routes
app.use('/contacts', contactsRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
