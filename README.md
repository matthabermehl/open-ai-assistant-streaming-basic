# OpenAI Assistant Streaming Basic Starter
This is a simple bare-bones example of streaming to the browser using OpenAI's Assistants API (Javascript SDK) on a node.js (Express) back end. Uses [socket.io](https://socket.io).

Pull requests are welcome to correct errors or improve simplicity and clarity of the code. It's my hope that this will actually be useful for someone else as a template to start AI web applications.

## Instructions
This has been tested on node.js v20, but likely works on 18. Highly recommend [node version manager](https://github.com/nvm-sh/nvm) for managing node versions.

Create a `.env` file in the server directory and paste the following:
```
# server/.env
OPENAI_API_KEY=<your-OpenAI-API-key>
```
Replace `<your-OpenAI-API-key>` with your actual key.

In the server directory, run `node server.js`

Visit http://localhost:3005
