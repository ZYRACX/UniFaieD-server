const express = require("express")
const cors = require("cors");
const {PrismaClient} = require("@prisma/client")
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: true
});

const prisma = new PrismaClient()

const PORT = 8000
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connect the client
io.on('connect', (socket) => {
    // print the socket ID of connected client
    console.log('User connected: ' + socket.id);
    socket.on("send-info", (data) => {
        console.log(data)
    })
    // disconnect client event
    socket.on('disconnect', () => {
        // log the ID of of disconnected client
        console.log('User disconnected: ' + socket.id);
    });
})
app.post("/auth/register", (req, res) => {
    const {username, email, password} = req.body
})

http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

