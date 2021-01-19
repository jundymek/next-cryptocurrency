import Boom from '@hapi/boom';
import Hapi from '@hapi/hapi';
import Joi from 'joi';

interface AssetInput {
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
        handler: getAssetHandler,
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

async function getAssetHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const { prisma } = request.server.app;
  const userId = request.auth.credentials.userId as number;
  try {
    const assets = await prisma.asset.findMany({
      where: {
        userId,
      },
    });
    console.log(assets);
    return h.response(assets).code(200);
  } catch (error) {
    console.log(error);
  }
}

async function updateAssetHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const { prisma } = request.server.app;
  const payload = request.payload as AssetInput;
  const username = request.auth.credentials.userName as string;

  try {
    const modifiedAsset = await prisma.asset.update({
      where: {
        currencyName: payload.currencyName,
      },
      data: {
        currencyName: payload.currencyName,
        amount: payload.amount,
        User: {
          connect: {
            username,
          },
        },
      },
    });
    return h.response(modifiedAsset).code(200);
  } catch (err) {
    console.log(err);
    return Boom.badImplementation();
  }
}

async function createAssetHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const { prisma } = request.server.app;
  const payload = request.payload as AssetInput;

  const username = request.auth.credentials.userName as string;

  try {
    const newAsset = await prisma.asset.create({
      data: {
        currencyName: payload.currencyName,
        amount: payload.amount,
        User: {
          connect: {
            username,
          },
        },
      },
    });

    return h.response(newAsset).code(201);
  } catch (err) {
    console.log(err.code);
    return Boom.conflict();
  }
}
