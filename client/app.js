// client/app.js

const socket = io('http://localhost:3005');

// Reference to the output textarea
const output = document.getElementById('output');

// Handle incoming streamed messages
socket.on('stream', (data) => {
  // Append the streamed data to the textarea
  output.value += data;
  output.scrollTop = output.scrollHeight; // Auto-scroll to the bottom
});

// Handle sending messages in one chunk
document.getElementById('sendBtn').addEventListener('click', () => {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value;

  if (message.trim()) {
    socket.emit('message', message);
    messageInput.value = ''; // Clear the input field after sending
  }
});
