import { createServer } from '../src/server';
import Hapi from '@hapi/hapi';

describe('POST /api/users - create new user', () => {
  let server: Hapi.Server;

  beforeAll(async () => {
    server = await createServer();
  });

  afterAll(async () => {
    await server.stop();
  });

  let userId: number;

  test('create user', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/api/users',
      payload: {
        username: 'test',
      },
    });

    expect(response.statusCode).toEqual(201);
    userId = JSON.parse(response.payload)?.id;
    expect(typeof userId === 'number').toBeTruthy();
  });
});
