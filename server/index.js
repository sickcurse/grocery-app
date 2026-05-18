const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const itemRoutes = require('./routes/items');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/grocery-app')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

app.use('/items', itemRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});