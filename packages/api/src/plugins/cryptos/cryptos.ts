import Hapi from '@hapi/hapi';
import { getCryptoData } from './cryptosHelpers';

const plugin: Hapi.Plugin<undefined> = {
  name: 'app/cryptos',
  register: async function (server: Hapi.Server) {
    server.route({
      method: 'GET',
      path: '/api/cryptos',
      async handler() {
        const cryptos = await getCryptoData();
        return cryptos;
      },
      options: {
        auth: false,
      },
    });
  },
};

export default plugin;
