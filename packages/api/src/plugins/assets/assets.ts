import Hapi from '@hapi/hapi';

interface AssetInput {
  userId: number;
  currencyName: string;
  amount: number;
  buyPrice: number;
}

const plugin = {
  name: 'app/assets',
  dependencies: ['prisma'],
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: 'POST',
        path: '/api/assets',
        handler: createAssetHandler,
      },
    ]);
  },
};

export default plugin;

async function createAssetHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const { prisma } = request.server.app;
  const payload = request.payload as AssetInput;

  try {
    const newAsset = await prisma.asset.create({
      data: {
        currencyName: payload.currencyName,
        amount: payload.amount,
        buyPrice: payload.buyPrice,
        User: {
          connect: {
            id: payload.userId,
          },
        },
      },
    });
    return h.response(newAsset).code(201);
  } catch (err) {
    console.log(err);
  }
}
