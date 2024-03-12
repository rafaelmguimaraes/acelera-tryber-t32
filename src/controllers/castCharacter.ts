import { NextFunction, Request, Response } from 'express';
import BadRequest from '../errors/badRequest';
import NotFound from '../errors/notFound';
import CastCharacterInterface from '../interfaces/castCharacter';
import { CastCharacterService } from '../services/castCharacter';
export async function create(req: Request, res: Response, next: NextFunction) {
  const { castId, characterId } = req.body as CastCharacterInterface;
  const castCharacterService = new CastCharacterService();
  try {
    if (castId === undefined || characterId === undefined) {
      throw new BadRequest('Você precisa enviar o castId e characterId');
    }
    await castCharacterService.create({ castId, characterId });
    res.status(201).send();
  } catch (err) {
    next(err);
  }
}
export async function find(req: Request, res: Response, next: NextFunction) {
  const { castId, characterId } = req.query;
  const castCharacterService = new CastCharacterService();
  try {
    if (castId === undefined && characterId === undefined) 
		throw new BadRequest('Você precisa enviar ou castId ou characterId');
    let obj;
    if (castId !== undefined) {
      obj = await castCharacterService.findByCast(parseInt(castId as string, 10));
    }
    if (characterId !== undefined) {
      obj = await castCharacterService.findByCharacter(parseInt(characterId as string, 10));
    }
    if (!obj) throw new NotFound('Dados não encontrados');
    return res.status(200).json(obj);
  } catch (err) {
    next(err);
  }
}
export async function list(_req: Request, res: Response, next: NextFunction) {
  const castCharacterService = new CastCharacterService();
  try {
    const castCharacterList = await castCharacterService.list();
    return res.json(castCharacterList);
  } catch (err) {
    next(err);
  }
}