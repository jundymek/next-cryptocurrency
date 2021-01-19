import Hapi from '@hapi/hapi';

export async function getAssetsHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
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
  } catch (err) {
    throw new Error(err);
  }
}
