"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middlwares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middlwares/notFound"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = __importDefault(require("./app/config"));
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:5173',
        config_1.default.client_url,
    ].filter(Boolean),
    credentials: true,
}));
// application routes
app.use('/api/v1', routes_1.default);
const rootHandler = async (req, res) => {
    res.status(200).json({
        success: true,
        message: '🚀 Nexora E-Commerce Hub API Server is Active & Running!',
        timestamp: new Date().toISOString(),
    });
};
app.get('/', rootHandler);
app.use(globalErrorHandler_1.default);
//Not Found
app.use(notFound_1.default);
exports.default = app;
