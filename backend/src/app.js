require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

//JSON and form data responses
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//solve CORS
app.use(cors({ credentials: true, origin: 'localhost:3000' }));

//upload directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//db connection
require('./config/db.js');

const port = process.env.PORT;

const router = require('./routes/Router');

app.use(router);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
