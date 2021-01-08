import Hapi from '@hapi/hapi';
import { getCryptoData } from './cryptosHelpers';

const plugin: Hapi.Plugin<undefined> = {
  name: 'app/cryptos',
  register: async function (server: Hapi.Server) {
    server.route({
      method: 'GET',
      path: '/api/cryptos',
      handler: async function (_, h: Hapi.ResponseToolkit) {
        const cryptos = await getCryptoData();
        return h.response(cryptos).code(200);
      },
    });
  },
};

export default plugin;
