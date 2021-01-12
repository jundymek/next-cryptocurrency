import Hapi from '@hapi/hapi';
import cryptos from './plugins/cryptos/cryptos';
import prisma from './plugins/prisma/prisma';
import users from './plugins/users/users';
import assets from './plugins/assets/assets';

const server: Hapi.Server = Hapi.server({
  port: process.env.PORT || 3001,
  host: process.env.HOST || 'localhost',
  routes: { cors: true },
});

export async function createServer(): Promise<Hapi.Server> {
  await server.register([cryptos, prisma, users, assets]);
  await server.initialize();

  return server;
}

export async function startServer(server: Hapi.Server): Promise<Hapi.Server> {
  await server.start();
  console.log(`Server running on ${server.info.uri}`);

  return server;
}

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});
