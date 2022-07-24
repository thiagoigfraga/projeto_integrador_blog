const mongoose = require('mongoose');
const User = require('../models/User');

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const conn = async () => {
    try {
        const dbConn = await mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassword}@cluster0.s3qjw4n.mongodb.net/?retryWrites=true&w=majority`
        );

        console.log('DB conectada com sucesso!');

        return dbConn;
    } catch (error) {
        console.log(error);
    }
};

conn();

module.exports = conn;
