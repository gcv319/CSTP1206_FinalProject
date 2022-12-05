const express = require('express');
const app = express();


const PORT = 4000;
const mongoose = require('mongoose');

require('dotenv').config();

app.use(express.json());

app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI, (error) => {
  if (error) {
    console.log('There was an error', error);
  } else {
    console.log('Database successfully connected!')
  }
})

app.get('/', (req, res) => {
  return res.send("Endpoints are here!");
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})