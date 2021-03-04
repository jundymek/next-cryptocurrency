import Boom from '@hapi/boom';
import Hapi from '@hapi/hapi';
import { checkIfUserOwnsAsset } from '../../../utils/checkIfUserOwnsAsset';
import { handlePrismaError } from '../../../utils/handlePrismaError';
import { AssetInput } from '../assets';

export async function deleteAssetHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const { prisma } = request.server.app;
  const { id } = request.payload as AssetInput;
  const userId = request.auth.credentials.userId as number;

  try {
    const isAllowed = await checkIfUserOwnsAsset(request, id, userId);
    if (isAllowed) {
      await prisma.asset.delete({
        where: {
          id,
        },
      });
      return h.response().code(204);
    } else {
      throw new Error('You are not allowed');
    }
  } catch (err) {
    console.log(err);
    return handlePrismaError(err);
  }
}
