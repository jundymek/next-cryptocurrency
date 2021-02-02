import Hapi from '@hapi/hapi';

const plugin: Hapi.Plugin<undefined> = {
  name: 'app/status',
  register: async function (server: Hapi.Server) {
    server.route({
      method: 'GET',
      path: '/api/status',
      handler: (_, h: Hapi.ResponseToolkit) => {
        return h.response({ validToken: true }).code(200);
      },
    });
  },
};

export default plugin;
