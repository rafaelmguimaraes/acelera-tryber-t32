import 'jest';
import request from 'supertest';
import app from '../../src/app';
import connection from '../../src/database/connection';
import { executeQueries, readQueries } from '../../src/database/queryUtils';

describe('App', () => {
  it('should return 404 on get invalid page', async () => {
    const result = await request(app).get('/invalid');
    expect(result.status).toEqual(404);
  });
  it('should return 500 on no database when listing cast', async () => {
    await executeQueries(connection, readQueries('dropDatabase.sql'));
    await connection.end();
    console.error = jest.fn();

    const result = await request(app).get('/casts');
    expect(result.status).toEqual(500);
    expect(console.error).toHaveBeenCalled();
  });
});