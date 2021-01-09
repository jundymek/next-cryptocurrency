import Hapi from '@hapi/hapi';

interface Asset {
  currencyName: string;
  amount: number;
  buyPrice: number;
}

interface UserInput {
  username: string;
  // assets: [];
}

const plugin = {
  name: 'app/users',
  dependencies: ['prisma'],
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: 'POST',
        path: '/api/users',
        handler: createUserHandler,
      },
    ]);
  },
};

export default plugin;

async function createUserHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const { prisma } = request.server.app;
  const payload = request.payload as UserInput;

  try {
    const newUser = await prisma.user.create({
      data: {
        username: payload.username,
        // assets: [],
      },
      select: {
        id: true,
      },
    });
    return h.response(newUser).code(201);
  } catch (err) {
    console.log(err);
  }
}
