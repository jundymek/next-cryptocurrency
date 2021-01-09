import Hapi from '@hapi/hapi';
import cryptos from './plugins/cryptos/cryptos';
import prisma from './plugins/prisma/prisma';
import users from './plugins/users/users';

const server: Hapi.Server = Hapi.server({
  port: process.env.PORT || 3001,
  host: process.env.HOST || 'localhost',
});

export async function createServer(): Promise<Hapi.Server> {
  await server.register([cryptos, prisma, users]);
  await server.initialize();

  return server;
}

// export async function start(): Promise<Hapi.Server> {
//   await server.register([cryptos, prisma, users]);
//   await server.start();
//   return server;
// }

export async function startServer(server: Hapi.Server): Promise<Hapi.Server> {
  await server.start();
  console.log(`Server running on ${server.info.uri}`);

  return server;
}

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

// start()
//   .then((server) => {
//     console.log(`Server running on ${server.info.uri}`);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
