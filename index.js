require('dotenv').config();
const cors = require('cors');
const mongoose = require("mongoose");
const express = require("express");
const Menu = require("./modals/menuModal");

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

const app = express();

// Middleware
app.use(cors({
    credentials: true,
    origin: process.env.CORS_URI
}));
app.use(express.json());

// Route
app.get("/loadMenu", async (req, res) => {
    try {
        const data = await Menu.find();
        console.log(data);
        res.json(data);
    } catch (err) {
        console.error('Error fetching menu data: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server Running on port ${PORT}...`));