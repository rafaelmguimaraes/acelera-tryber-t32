import { RowDataPacket } from 'mysql2';
import conn from '../database/connection';
import CastCharacter from '../interfaces/castCharacter';
import { ComplexModel } from './model';
const DATABASE = 'cartoon';
export default class CastCharacterModel implements ComplexModel<CastCharacter> {
  constructor(private tableName: string = 'Cast_Characters', private connection = conn) { }
  async create(obj: CastCharacter) {
    await this.connection.execute(
      `INSERT INTO ${DATABASE}.${this.tableName}(
        cast_id, character_id
      ) VALUES (?, ?);`,
      [ obj.castId, obj.characterId ]
    );
  }

  async list() {
    const result = await this.connection.execute<(RowDataPacket)[]>(
      `SELECT Ca.name AS cast, Ch.name AS 'character' FROM ${DATABASE}.Cast_Characters AS CC
      JOIN ${DATABASE}.Casts AS Ca ON Ca.id = CC.cast_id
      JOIN ${DATABASE}.Characters AS Ch ON Ch.id = CC.character_id;`
    );
    const [ castCharacters ] = result;
    return castCharacters as CastCharacter[];
  }

  async find(_id: number): Promise<CastCharacter | null> {
    return null;
  }

  async findByCast(id: number): Promise<CastCharacter | null> {
    const result = await this.connection.execute(
      `SELECT Ca.name AS cast, Ch.name AS 'character' FROM ${DATABASE}.Cast_Characters AS CC
      JOIN ${DATABASE}.Casts AS Ca ON Ca.id = CC.cast_id
      JOIN ${DATABASE}.Characters AS Ch ON Ch.id = CC.character_id
      WHERE Ca.id = ?;`, [ id ]
    );
    const [ castCharacters ] = result as RowDataPacket[];
    return castCharacters[ 0 ] as CastCharacter;
  }

  async findByCharacter(id: number): Promise<CastCharacter | null> {
    const result = await this.connection.execute(
      `SELECT Ca.name AS cast, Ch.name AS 'character' FROM ${DATABASE}.Cast_Characters AS CC
      JOIN ${DATABASE}.Casts AS Ca ON Ca.id = CC.cast_id
      JOIN ${DATABASE}.Characters AS Ch ON Ch.id = CC.character_id
      WHERE Ch.id = ?;`, [ id ]
    );
    const [ castCharacters ] = result as RowDataPacket[];
    return castCharacters[ 0 ] as CastCharacter;
  }
}