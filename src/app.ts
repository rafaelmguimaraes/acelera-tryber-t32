import express from 'express';

const app = express();

app.get('/health', (_req, res) => res.status(200).send({message: 'Turma 32!'}))

export default app;