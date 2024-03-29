const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const { chats } = require('./data/data');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.send("Hello");
})

app.get("/api/chats", (req, res) => {
    res.send(chats);
})

app.get('/api/chats/:id', (req, res) => {
    const singleChat = chats.find(c => c._id === req.params.id);
    res.send(singleChat);
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});