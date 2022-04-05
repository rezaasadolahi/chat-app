const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { Server } = require('socket.io')
const { createServer } = require('http')


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

dotenv.config({ path: './config.env' })

const server = createServer(app)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})



//* use socket.io

io.on("connection", (socket) => {
    console.log(socket.id)

    socket.on("joinRoom", (room) => socket.join(room))

    socket.on("newMessage", ({ newMessage, room }) => {
        io.in(room).emit("getLatestMessage", newMessage)
    })

})




server.listen(process.env.PORT, () => console.log(`server run on port ${process.env.PORT}`))