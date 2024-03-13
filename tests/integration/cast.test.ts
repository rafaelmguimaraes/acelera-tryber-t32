import request from 'supertest';
import app from '../../src/app';
import connection from '../../src/database/connection';
import { executeQueries, readQueries } from '../../src/database/queryUtils';

const dropQuery = readQueries('dropDatabase.sql');

const casts = [
    {
      "id": 1,
      "name": "Homer Simpson"
    },
    {
      "id": 2,
      "name": "Marge Simpson"
    },
    {
      "id": 3,
      "name": "Bart Simpson"
    },
    {
      "id": 4,
      "name": "Lisa Simpson"
    },
    {
      "id": 5,
      "name": "Maggie Simpson"
    },
    {
      "id": 6,
      "name": "Ned Flanders"
    },
    {
      "id": 7,
      "name": "Mr. Burns"
    },
    {
      "id": 8,
      "name": "Principal Skinner"
    },
    {
      "id": 9,
      "name": "Krusty the Clown"
    },
    {
      "id": 10,
      "name": "Milhouse Van Houten"
    }
  ]

describe('Cast', () => {
  beforeEach(async () => {
    await executeQueries(connection, dropQuery);
    await executeQueries(connection);
  });
  afterAll(async () => {
    await executeQueries(connection, dropQuery);
    await connection.end();
  });

  it('should create one cast', async () => {
    const result = await request(app).post('/casts').send({ name: 'Tatiana' });
    expect(result.status).toEqual(201);
  });

  it('should return 400 when creating invalid cast', async () => {
    const result = await request(app).post('/casts').send();
    expect(result.status).toEqual(400);
  });
  it('should list all casts', async () => {
    const result = await request(app).get('/casts');
    expect(result.status).toEqual(200);
    expect(result.body.length).toEqual(casts.length);
  });
  it('should list all casts plus one new cast', async () => {
    await request(app).post('/casts').send({ name: 'Guima' });
    const result = await request(app).get('/casts');
    expect(result.body).toEqual(expect.arrayContaining([ expect.objectContaining({ name: 'Guima' }) ]));
  });

  it('should find one cast', async () => {
    await request(app).post('/casts').send({ name: 'cast1' });
    const result = await request(app).get('/casts/11');
    expect(result.status).toEqual(200);
    expect(result.body).toEqual({ id:11, name: 'cast1' });
  });

  it('should return 404 finding inexistent cast', async () => {
    const result = await request(app).get('/casts/0');
    expect(result.status).toEqual(404);
  });
});