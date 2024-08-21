// lib/redis.ts
import { createClient } from 'redis';

let client: any;

const getRedisClient = async () => {
  if (!client) {
    client = createClient({
      url: process.env.REDIS_URL,
    });

    client.on('error', (err : any) => console.error('Redis Client Error', err));
    await client.connect();
  }
  return client;
};

export default getRedisClient;
