const mongoose = require('mongoose')
const express = require('express')
const app = express();
const dotenv = require('dotenv')
const { chats } = require('./data/data')
const userRoutes = require('./routes/userRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
dotenv.config()

mongoose.connect(process.env.MONGO_URI)
    .then(console.log('MongoDB Connected.'))
    .catch('Error Happend.')

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Home Page")
})

app.get('/api/chat', (req, res) => {
    res.send(chats)
})

app.get('/api/chat/:id', (req, res) => {
    const singleChat = chats.find(c => c._id === req.params.id)
    res.send(singleChat)
})

app.use('/api/user', userRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
})