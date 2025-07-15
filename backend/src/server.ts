require('dotenv').config(); // Load environment variables from .env
const app = require('./app');
const http = require('http');
const connetDataBase = require('./config/db');
const mongoose = require("mongoose");
const server = http.createServer(app);

// Start server on the specified port
const PORT = process.env.PORT || 5000;

// Connect Mongodb
connetDataBase().then((res: any) => {
    console.log('res', res)

    // Create HTTP server
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err: any) => {
    console.log('err', err)
    process.exit(1)
});


process.on('SIGINT', async () => {
    try {
        await mongoose?.connection?.close();
        console.log('MongoDB connection closed');
        process.exit(0);  // Exit process
    } catch (err) {
        console.error('Error closing MongoDB connection:', err);
        process.exit(1);
    }
});

export { };