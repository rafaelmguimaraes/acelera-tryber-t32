import { NextFunction, Request, Response } from 'express';
import BadRequest from '../errors/badRequest';
import NotFound from '../errors/notFound';
import CharacterInterface from '../interfaces/character';
import { CharacterService } from '../services/character';
export async function create(req: Request, res: Response, next: NextFunction) {
  const { name } = req.body as CharacterInterface;
  const characterService = new CharacterService();
  try {
    if (name === undefined) {
      throw new BadRequest('Você precisa enviar o nome do personagem');
    }
    await characterService.create({ name });
    return res.status(201).send();
  } catch (err) {
    next(err);
  }
}
export async function find(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const characterService = new CharacterService();
  try {
    if (id === undefined) throw new BadRequest('Você precisa enviar o id da pesquisa');
    const obj = await characterService.find(parseInt(id, 10));
    if (!obj) throw new NotFound('Pessoa não encontrada');
    return res.status(200).json(obj);
  } catch (err) {
    next(err);
  }
}
export async function list(_req: Request, res: Response, next: NextFunction) {
  const characterService = new CharacterService();
  try {
    const characterList = await characterService.list();
    return res.json(characterList);
  } catch (err) {
    next(err);
  }
}