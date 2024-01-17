const express = require("express")
const cors = require("cors");
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});


const PORT = 8000
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// app.get("/", (req, res) => {
//     res.send(["hello user"])
//     // io.on("connect", socket => {
//     //     // socket.to(to_send).emit("friend-request", {})
//     //     console.log(socket.id)
//     // })
// })

io.on('connection', (socket) => {
    console.log('User connected: ' + socket.id);
    socket.on("send-request", (data) => {
        const to_send = data.clientsocketId;
        const sender_socketID = data.socketID
        console.log(to_send)
        socket.to(to_send).emit("friend-request", {requestID:sender_socketID, request:true})
    })
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
})
// app.get("/username/friend_request/to_send", (req, res) => {
//     console.log(username)
//     io.on("connect", socket => {
//         socket.to(to_send).emit("friend-request", {})
//     })
// })
http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})