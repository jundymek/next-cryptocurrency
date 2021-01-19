import Boom from '@hapi/boom';
import Hapi from '@hapi/hapi';
import { handlePrismaError } from '../../../utils/handlePrismaError';
import { AssetInput } from '../assets';

export async function updateAssetHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
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
    return handlePrismaError(err);
  }
}
