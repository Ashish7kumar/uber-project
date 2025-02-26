import dotenv from 'dotenv';
import http from 'http';
import app from './app.js';
import connectToDB from './db/db.js';

dotenv.config();

const port = process.env.PORT || 3000; 
const server = http.createServer(app);

server.listen(port, async () => {
   await connectToDB();
   console.log(`Server is running on port ${port}`);
});
