import Hapi from '@hapi/hapi';
import Joi from 'joi';
import Bcrypt from 'bcrypt';

interface UserInput {
  username: string;
  password: string;
}

const userInputValidator = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const plugin = {
  name: 'app/users',
  dependencies: ['prisma'],
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: 'POST',
        path: '/api/users',
        handler: createUserHandler,
        options: {
          validate: {
            payload: userInputValidator,
          },
          auth: false,
        },
      },
    ]);
  },
};

export default plugin;

async function createUserHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const { prisma } = request.server.app;
  const payload = request.payload as UserInput;

  try {
    const hashedPassword = await Bcrypt.hash(payload.password, 10);
    const newUser = await prisma.user.create({
      data: {
        username: payload.username,
        password: hashedPassword,
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