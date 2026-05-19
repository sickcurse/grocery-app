const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const itemRoutes = require('./routes/items');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://admin:lzlkMN3Rip5gmsVX@cluster0.8qhio3m.mongodb.net/grocery-app')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

app.use('/items', itemRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});