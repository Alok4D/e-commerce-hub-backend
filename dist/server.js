"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
const DB_1 = require("./app/DB");
let server;
async function main() {
    try {
        await mongoose_1.default.connect(config_1.default.database_url);
        console.log('📦 Connected to MongoDB Atlas successfully!');
        // Seed Super Admin and default data
        await (0, DB_1.seedDatabase)();
        server = app_1.default.listen(config_1.default.port, () => {
            console.log(`🚀 Nexora E-Commerce Hub API listening on port ${config_1.default.port}`);
        });
    }
    catch (err) {
        console.error('❌ Failed to connect to database or start server:', err);
    }
}
main();
process.on('unhandledRejection', (err) => {
    console.log(`😈 unhandledRejection detected:`, err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
process.on('uncaughtException', (err) => {
    console.log(`😈 uncaughtException detected:`, err);
    process.exit(1);
});
