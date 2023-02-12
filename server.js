const express = require('express');
const cors = require('cors')
require('dotenv').config();

const index = require('./routes/index')

// database connection
const connectToMongo = require('./db');
connectToMongo();



const app = express()
const port = process.env.PORT || 5000


// middle ware to fetch data
app.use(express.json())
app.use(cors())

// Available Routes
app.use('/api', index);
// app.use('/api/notes/', require('./routes/notes.js'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})