const dotenv=require('dotenv');
dotenv.config();
const http=require('http');
const app=require('./app');
const port=process.env.PORT;
const server=http.createServer(app);
server.listen(3000,()=>{
   console.log('server is runing on port'+port);
    
});