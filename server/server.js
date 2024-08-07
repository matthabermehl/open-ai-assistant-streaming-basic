// server/server.js
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { createAssistant, createThread, createMessage, streamRun } from './openai.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('../client')); // Serve static files from the 'client' directory

let assistantId;
let threadId;

// Initialize the assistant and thread when the server starts
(async () => {
  assistantId = await createAssistant();
  threadId = await createThread();
})();

io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle incoming message sent in one chunk
  socket.on('message', async (msg) => {
    console.log('Received message:', msg);

    // Create a message in the thread
    await createMessage(threadId, msg);

    // Stream the responses back to the client
    await streamRun(threadId, assistantId, socket);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3005, () => {
  console.log('Server is running on http://localhost:3005');
});
