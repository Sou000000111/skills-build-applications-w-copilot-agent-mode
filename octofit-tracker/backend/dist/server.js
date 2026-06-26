"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const api_1 = require("./api");
const database_1 = require("./database");
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', baseUrl });
});
(0, api_1.registerApiRoutes)(app);
(0, database_1.connectDatabase)()
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Backend listening on port ${port}`);
        console.log(`API base URL: ${baseUrl}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection failed', error);
    process.exit(1);
});
