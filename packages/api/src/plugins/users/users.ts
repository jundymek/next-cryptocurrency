import Hapi from '@hapi/hapi';
import Joi from 'joi';
import { createUserHandler } from './handlers/createUserHandler';

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
