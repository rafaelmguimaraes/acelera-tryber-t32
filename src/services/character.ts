import Character from '../interfaces/character';
import { SimpleModel } from '../models/model';
import CharacterModel from '../models/character';
import Service from './service';
import BadRequest from '../errors/badRequest';

export class CharacterService extends Service<Character> {
  constructor(model: SimpleModel<Character> = new CharacterModel()) {
    super(model);
  }

  async create(obj: Character): Promise<void> {
    if (obj.name.length <= 3) {
      throw new BadRequest('O nome precisa ter pelo menos 4 caracteres');
    }
    return super.create(obj);
  }
}