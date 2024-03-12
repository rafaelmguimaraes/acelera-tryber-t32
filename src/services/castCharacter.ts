import CastCharacter from '../interfaces/castCharacter';
import { ComplexModel } from '../models/model';
import CastCharacterModel from '../models/castCharacter';
import Service from './service';
import BadRequest from '../errors/badRequest';

export class CastCharacterService extends Service<CastCharacter> {
  constructor(model: ComplexModel<CastCharacter> = new CastCharacterModel()) {
    super(model);
  }

  async create(obj: CastCharacter): Promise<void> {
    if (!obj.castId && !obj.characterId) {
      throw new BadRequest('Obrigatorio passar castId e characterId');
    }
    return super.create(obj);
  }

  async findByCast(id: number): Promise<CastCharacter | null> {
    return (this.model as ComplexModel<CastCharacter>).findByCast(id)
  }

  async findByCharacter(id: number): Promise<CastCharacter | null> {
    return (this.model as ComplexModel<CastCharacter>).findByCharacter(id)
  }
}