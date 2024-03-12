import Cast from '../interfaces/cast';
import { SimpleModel } from '../models/model';
import CastModel from '../models/cast';
import Service from './service';
import BadRequest from '../errors/badRequest';

export class CastService extends Service<Cast> {
  constructor(model: SimpleModel<Cast> = new CastModel()) {
    super(model);
  }

  async create(obj: Cast): Promise<void> {
    if (obj.name.length <= 3) {
      throw new BadRequest('O nome precisa ter pelo menos 4 caracteres');
    }
    return super.create(obj);
  }
}