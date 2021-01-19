import { PrismaError } from './prisma-errors';
import Boom from '@hapi/boom';

export function handlePrismaError(err: PrismaError) {
  console.log(err);
  switch (err.code) {
    case 'P2001':
      throw Boom.notFound();
    case 'P2002':
      throw Boom.conflict();
    case 'P2016':
      throw Boom.notFound('Record not found');
    default:
      throw new Error(`Unhandled Prisma error: ${err.code}`);
  }
}
