// server/openai.js
import dotenv from 'dotenv';
import OpenAI from 'openai';

// Initialize dotenv to load environment variables
dotenv.config();

// Initialize OpenAI with the API key from the environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create an assistant
async function createAssistant() {
  const assistant = await openai.beta.assistants.create({
    instructions: "You are a helpful assistant.",
    name: "Helpful Assistant",
    model: "gpt-4o"
  });
  return assistant.id;
}

// Create a thread
async function createThread() {
  const thread = await openai.beta.threads.create();
  return thread.id;
}

// Create a message in the thread
async function createMessage(threadId, content) {
  const message = await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content: content,
  });
  return message.id;
}

// Stream the run
async function streamRun(threadId, assistantId, socket) {
  const stream = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
    stream: true
  });

  for await (const event of stream) {
    if (event.data) {
      try {
        const eventData = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (eventData.object === 'thread.message.delta') {
          const deltaContent = eventData.delta.content.map(c => c.text.value).join('');
          socket.emit('stream', deltaContent);
        }
      } catch (error) {
        console.error('Error parsing event data:', error);
      }
    }
  }
}


export { createAssistant, createThread, createMessage, streamRun };
