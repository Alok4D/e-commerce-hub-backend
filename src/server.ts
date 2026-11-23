import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { seedDatabase } from './app/DB';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('📦 Connected to MongoDB Atlas successfully!');

    // Seed Super Admin and default data
    await seedDatabase();

    server = app.listen(config.port, () => {
      console.log(`🚀 Nexora E-Commerce Hub API listening on port ${config.port}`);
    });
  } catch (err) {
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
  } else {
    process.exit(1);
  }
});

process.on('uncaughtException', (err) => {
  console.log(`😈 uncaughtException detected:`, err);
  process.exit(1);
});
