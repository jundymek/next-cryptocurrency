import Boom from '@hapi/boom';
import Hapi from '@hapi/hapi';
import { handlePrismaError } from '../../../utils/handlePrismaError';
import { AssetInput } from '../assets';


export async function deleteAssetHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const { prisma } = request.server.app;
  const payload = request.payload as AssetInput;
  const username = request.auth.credentials.userName as string;

  try {
    await prisma.asset.delete({
      where: {
        id: payload.id,
      },
    });
    return h.response().code(204);
  } catch (err) {
    console.log(err);
    return handlePrismaError(err);
  }
}
