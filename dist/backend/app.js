"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const cookieParser = require('cookie-parser');
const serverless_http_1 = __importDefault(require("serverless-http"));
const index_1 = __importDefault(require("./routes/index"));
const response_1 = require("./utils/response");
const path_1 = __importDefault(require("path"));
// Middleware
app.use(express.json());
app.use(cors({
    origin: [
        'http://localhost:3000',
        "http://localhost:5173"
    ], // Add allowed domains
    credentials: true
}));
app.use(morgan('dev')); // Logging middleware
app.use(cookieParser());
// Routes
app.use('/api', index_1.default);
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "frontend/build", "index.html"));
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    (0, response_1.errorResponse)(res, 'Something went wrong!', 500, err);
});
module.exports = (0, serverless_http_1.default)(app);
