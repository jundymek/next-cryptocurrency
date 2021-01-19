import Hapi from '@hapi/hapi';
import Bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken';

interface UserInput {
  username: string;
  password: string;
}

export async function loginHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const { prisma } = request.server.app;
  const payload = request.payload as UserInput;

  const account = await prisma.user.findFirst({
    where: { username: payload.username },
  });

  if (!account || !(await Bcrypt.compare(payload.password, account.password))) {
    return h.redirect('/api/login');
  }
  const token = generateToken(account);
  return { token: token, userId: account.id, username: account.username };
}
