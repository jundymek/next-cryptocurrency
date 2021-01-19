import { createServer } from '../src/server';
import Hapi from '@hapi/hapi';

describe('Assets routes', () => {
  let server: Hapi.Server;
  let token: string;

  beforeAll(async () => {
    server = await createServer();
  });

  afterAll(async () => {
    await server.stop();
  });

  test('create asset without credentials', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/api/assets',
      payload: {
        currencyName: 'BTC',
        amount: 1,
      },
      headers: {
        Authorization: token,
      },
    });

    expect(response.statusCode).toEqual(401);
  });
});
