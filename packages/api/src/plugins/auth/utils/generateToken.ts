import { number } from 'joi';
import jwt from 'jsonwebtoken';

const secretKey = 'topSecretKey_ToBePutInFileInProductionEnv';

interface User {
  id: number;
  username: string;
}

const createToken = (user: User) =>
  jwt.sign(
    {
      // Put information to be encoded in this object
      userId: user.id,
      userName: user.username,
    },
    secretKey,
    { expiresIn: '1h', algorithm: 'HS256' },
  ); // Choose a expiry time and algorithm which suits you

export default createToken;
