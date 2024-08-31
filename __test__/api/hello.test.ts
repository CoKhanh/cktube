// __tests__/api/hello.test.ts
import { NextApiRequest, NextApiResponse } from 'next';
import handler from '@/pages/api/hello';

describe('/api/hello', () => {
  it('returns a status of 200 and the correct JSON response', async () => {
    const req = {} as NextApiRequest;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ name: 'John Doe' });
  });
});
