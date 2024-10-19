const express = require('express');
const bodyParser = require('body-parser');
const { connectDB, disconnectDB } = require('./database');
const User = require('./models/User');

const app = express();
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true,
}));
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json()); 

connectDB();

app.post('/api/data', async (req, res) => {
    try {
        const { date, summary1, city } = req.body;
        const newUser = new User({
            date,
            summary1,
            city
        });
        console.log(newUser)
        const result = await newUser.save();
        console.log(1, result)
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
