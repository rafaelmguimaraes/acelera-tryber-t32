import { RowDataPacket } from 'mysql2';
import conn from '../database/connection';
import Cast from '../interfaces/cast';
import { SimpleModel } from './model';
const DATABASE = 'cartoon';
export default class CastModel implements SimpleModel<Cast> {
  constructor(private tableName: string = 'Characters', 
    private connection = conn) { }

  async create(obj: Cast) {
    await this.connection.execute(
      `INSERT INTO ${DATABASE}.${this.tableName}(
        name
      ) VALUES (?);`,
      [ obj.name ]
    );
  }

  async list() {
    const result = await this.connection.execute(
      `SELECT id, name
      FROM ${DATABASE}.${this.tableName};`
    );
    const [ characters ] = result;
    return characters as Cast[];
  }

  async find(id: number): Promise<Cast | null> {
    const result = await this.connection.execute(
      `SELECT id, name
      FROM ${DATABASE}.${this.tableName} as C WHERE C.id = ?;`, [ id ]
    );
    const [ characters ] = result as RowDataPacket[];
    return characters[ 0 ] as Cast;
  }
}