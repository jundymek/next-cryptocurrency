import Hapi from '@hapi/hapi';

const plugin = {
  name: 'app/logout',
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: 'GET',
        path: '/api/logout',
        handler: function (request: Hapi.Request, h: Hapi.ResponseToolkit) {
          return h.response('You are logged out').code(401);
        },
      },
    ]);
  },
};

export default plugin;
