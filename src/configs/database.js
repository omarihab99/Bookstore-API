const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: 'src/.env' });
const MONGO_URL = process.env.MONGODB_URL ;
mongoose.connect(MONGO_URL);
mongoose.connection.on('connected', () => {
    console.log('Server: Mongoose is connected');
});
mongoose.connection.on('error', (err) => {
    console.log(err);
});
