// controllers/apiKeyMiddleware.ts
import { Request, ResponseToolkit, Server } from '@hapi/hapi';
import Boom from '@hapi/boom';
import dotenv from 'dotenv';

dotenv.config();

const validApiKey = process.env.API_KEY;

export const checkApiKey = {
  name: 'checkApiKey',
  version: '1.0.0',
  register: async function (server: Server) {
    server.ext('onRequest', (request: Request, h: ResponseToolkit) => {
      const apiKey = request.headers['api-key'];

      if (!apiKey || apiKey !== validApiKey) {
        console.log('Unauthorized access attempt');
        throw Boom.unauthorized('Invalid API key.');
      }
    //  console.log(apiKey);

      return h.continue;
    });
  },
};
