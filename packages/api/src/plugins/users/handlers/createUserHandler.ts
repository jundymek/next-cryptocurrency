import Hapi from '@hapi/hapi';
import Bcrypt from 'bcrypt';
import { handlePrismaError } from '../../../utils/handlePrismaError';

interface UserInput {
  username: string;
  password: string;
}

export async function createUserHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const { prisma } = request.server.app;
  const payload = request.payload as UserInput;

  try {
    const hashedPassword = await Bcrypt.hash(payload.password, 10);
    const newUser = await prisma.user.create({
      data: {
        username: payload.username,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    return h.response(newUser).code(201);
  } catch (err) {
    return handlePrismaError(err);
  }
}
