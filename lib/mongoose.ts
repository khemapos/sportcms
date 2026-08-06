import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI
const MONGO_DB_NAME = process.env.MONGO_DB_NAME

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

if (!MONGO_DB_NAME) {
  throw new Error('Please define the MONGO_DB_NAME environment variable inside .env.local')
}

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null }

if (!global.mongooseCache) {
  global.mongooseCache = cached
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: MONGO_DB_NAME,
      serverSelectionTimeoutMS: 5000,
    }

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongooseInstance) => {
      console.log(`MongoDB connected successfully to database: ${MONGO_DB_NAME}`)
      return mongooseInstance
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}
