import Boom from '@hapi/boom';
import Hapi from '@hapi/hapi';
import { func } from 'joi';
import { checkIfUserOwnsAsset } from '../../../utils/checkIfUserOwnsAsset';
import { handlePrismaError } from '../../../utils/handlePrismaError';
import { AssetInput } from '../assets';

export async function updateAssetHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const { prisma } = request.server.app;
  const { id, amount } = request.payload as AssetInput;
  const userId = request.auth.credentials.userId as number;
  const username = request.auth.credentials.userName as string;

  try {
    const isAllowed = await checkIfUserOwnsAsset(request, id, userId);
    if (isAllowed) {
      const modifiedAsset = await prisma.asset.update({
        where: {
          id,
        },
        data: {
          amount,
          User: {
            connect: {
              username,
            },
          },
        },
      });
      return h.response(modifiedAsset).code(200);
    } else {
      throw new Error('You are not allowed');
    }
  } catch (err) {
    console.log(err);
    return handlePrismaError(err);
  }
}
