import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

// Append standard Atlas query params if none present
const uri = MONGODB_URI.includes('?')
  ? MONGODB_URI
  : `${MONGODB_URI}?retryWrites=true&w=majority`;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
declare global {
  var mongoose: any;
  var __mongooseCache: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
}

let cached: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };

if (!global.__mongooseCache) {
  global.__mongooseCache = { conn: null, promise: null };
}
cached = global.__mongooseCache;

async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      tls: true,
      // Allow self-signed certs in dev (Atlas free-tier can have cert validation quirks)
      tlsInsecure: process.env.NODE_ENV !== 'production',
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose.connect(uri, opts);
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectToDatabase;
