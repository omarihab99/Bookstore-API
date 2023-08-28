const express = require('express');
const dotenv = require('dotenv');
const database = require('./configs/database');
const adminRoute = require('./routes/admins.route');
const userRoute = require('./routes/users.route');

dotenv.config({ path: 'src/.env' });
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use('/', userRoute);
app.use('/adminpanel', adminRoute);
app.listen(PORT, () => {
    console.log(`Server: listening on port ${PORT}`);
});