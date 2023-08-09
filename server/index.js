const http = require('http');
const app = require ('./app')
require ('dotenv').config()

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 5000;


console.log('PORT', PORT);
console.log('HOST', HOST);


const httpServer = http.createServer(app);

httpServer.listen(PORT, HOST, () => console.log(`Server is listen http://${HOST}:${PORT}`));