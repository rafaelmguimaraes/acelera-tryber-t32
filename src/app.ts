import express, { NextFunction, Request, Response } from 'express';
import BaseHTTPError from './errors/httpError';
import * as routers from './routes';

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => res.status(200).send({message: 'Olá Turma 32!'}))

app.use('/characters', routers.characterRouter);
app.use('/casts', routers.castRouter);
app.use('/castCharacters', routers.castCharacterRouter);

app.use((err: BaseHTTPError, _: Request, res: Response, __: NextFunction) => {
    if (err.statusCode) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    // eslint-disable-next-line no-console
    console.error(err.message);
    return res.status(500).json({ message: 'Erro interno' });
  });


export default app;