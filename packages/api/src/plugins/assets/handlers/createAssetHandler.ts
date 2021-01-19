import Boom from '@hapi/boom';
import Hapi from '@hapi/hapi';
import { handlePrismaError } from '../../../utils/handlePrismaError';
import { AssetInput } from '../assets';

export async function createAssetHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
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
    console.log('ERR code:', err.code);
    return handlePrismaError(err);
  }
}
