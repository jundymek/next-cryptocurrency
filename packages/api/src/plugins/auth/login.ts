import Hapi from '@hapi/hapi';
import Joi from 'joi';
import { loginHandler } from './handlers/loginHandler';

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
