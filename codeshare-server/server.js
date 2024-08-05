const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { Session, sequelize } = require('./model');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinRoom', async (room) => {
        socket.join(room);
        let session = await Session.findOne({ where: { room } });
        if (session) {
            socket.emit('loadCode', session.code);
        } else {
            session = await Session.create({ room });
        }

        socket.on('codeChange', async (data) => {
            const { room, code } = data;
            socket.to(room).emit('codeUpdate', code);
            await Session.update({ code }, { where: { room } });
        });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 4000;
sequelize.sync().then(() => {
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
