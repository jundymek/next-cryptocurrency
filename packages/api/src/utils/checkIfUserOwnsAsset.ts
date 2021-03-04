import Hapi from '@hapi/hapi';

export async function checkIfUserOwnsAsset(request: Hapi.Request, id: number, userId: number) {
  const { prisma } = request.server.app;
  try {
    const isAssetInUserPortfolio = await prisma.asset.findFirst({
      where: {
        userId,
        id,
      },
    });
    if (isAssetInUserPortfolio) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
}
