const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const mainRoutes = require('./routes');
const connectDB = require('./db');
const cors = require('cors');

app.use(express.json());
app.use(cors({
    origin: '*', // Adjust this to your needs
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/api/v1', mainRoutes);

app.listen(process.env.PORT, async () => {
    await connectDB();
    console.log('Server is running on port http://localhost:' + process.env.PORT);
});