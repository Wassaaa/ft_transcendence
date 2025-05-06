import Fastify from 'fastify';
import 'dotenv/config';

const app = Fastify({ logger: true });

app.get('/ping', async () => ({ pong: 'it works! lol' }));

const start = async () => {
  try {
    await app.listen({ port: process.env.PORT ? +process.env.PORT : 3000, host: '0.0.0.0' });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
