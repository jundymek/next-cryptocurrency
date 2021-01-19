import Boom from '@hapi/boom';
import Hapi from '@hapi/hapi';
import Joi from 'joi';
import { createAssetHandler } from './handlers/createAssetHandler';
import { getAssetsHandler } from './handlers/getAssetsHandler';
import { updateAssetHandler } from './handlers/updateAssetHandler';

export interface AssetInput {
  username: string;
  currencyName: string;
  amount: number;
  buyPrice: number;
}

const AssetInputValidator = Joi.object({
  currencyName: Joi.string().required(),
  amount: Joi.number().required(),
});

const plugin = {
  name: 'app/assets',
  dependencies: ['prisma'],
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: ['GET'],
        path: '/api/assets',
        handler: getAssetsHandler,
      },
      {
        method: ['POST'],
        path: '/api/assets',
        handler: createAssetHandler,
        options: {
          validate: {
            payload: AssetInputValidator,
          },
        },
      },
      {
        method: ['PUT'],
        path: '/api/assets/{currencyName}',
        handler: updateAssetHandler,
        options: {
          validate: {
            payload: AssetInputValidator,
          },
        },
      },
    ]);
  },
};

export default plugin;
