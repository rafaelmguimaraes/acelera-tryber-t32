import express from 'express';
import CharacterModel from './models/character';

const app = express();

app.get('/health', (_req, res) => res.status(200).send({message: 'Turma 32!'}))
app.get('/testDatabase', async (_req, res) => {
    const model = new CharacterModel(); 
    const characters = await model.list();
    res.status(200).send(characters)
});

export default app;