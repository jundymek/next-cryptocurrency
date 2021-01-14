import Hapi from '@hapi/hapi';
import Joi from 'joi';
import Bcrypt from 'bcrypt';
import generateToken from './utils/generateToken';

interface UserInput {
  username: string;
  password: string;
}

const userInputValidator = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const plugin = {
  name: 'app/login',
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: 'POST',
        path: '/api/login',
        handler: loginHandler,
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

async function loginHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const { prisma } = request.server.app;
  const payload = request.payload as UserInput;

  const account = await prisma.user.findFirst({
    where: { username: payload.username },
  });

  if (!account || !(await Bcrypt.compare(payload.password, account.password))) {
    return h.redirect('/api/login');
  }
  const token = generateToken(account);
  console.log(token);
  return { token: token };
}
