import Hapi from '@hapi/hapi';
import cryptos from './plugins/cryptos/cryptos';
import prisma from './plugins/prisma/prisma';
import users from './plugins/users/users';
import assets from './plugins/assets/assets';
import login from './plugins/auth/login';
import logout from './plugins/auth/logout';
import status from './plugins/status/status';
import Jwt from 'hapi-auth-jwt2';

const server: Hapi.Server = Hapi.server({
  port: process.env.PORT || 3001,
  host: process.env.HOST || 'localhost',
  routes: { cors: true },
});

const validate = async (decoded: any, request: Hapi.Request, h: Hapi.ResponseToolkit) => {
  const { prisma } = request.server.app;
  const searchResults = await prisma.user.findFirst({ where: { id: decoded.id } });
  if (searchResults) {
    return { isValid: true };
  }
  return { isValid: false };
};

export async function createServer(): Promise<Hapi.Server> {
  await server.register([Jwt, cryptos, prisma, users, assets, login, logout, status]);
  server.auth.strategy('jwt', 'jwt', {
    key: 'topSecretKey_ToBePutInFileInProductionEnv', // secret key, define your own, or get from Auth0
    validate, // the function which validates the token
    verifyOptions: {
      algorithm: ['HS256'], // algorithm used to sign the token
    },
  });
  server.auth.default('jwt'); // Use JWT strategy by default
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
