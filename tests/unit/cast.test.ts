import Cast from '../../src/interfaces/cast';
import { SimpleMemoryModel } from '../../src/models/memoryModel';
import { CastService } from '../../src/services/cast';

let memoryModel: SimpleMemoryModel<Cast>;
let castService: CastService;

describe('Cast', () => {
  beforeEach(() => {
    memoryModel = new SimpleMemoryModel();
    castService = new CastService(memoryModel);
  });

  describe('Create', () => {
    it('should create a new cast', async () => {
      await castService.create({
        name: 'zambs'
      });

      const expected = { name: 'zambs' };
      expect(await castService.list()).toEqual(
        expect.arrayContaining([ expect.objectContaining(expected) ])
      );
    });

    it(
      'should create throw an error when trying to create new cast with invalid name',
      async () => {
        await expect(
          async () => await castService.create({ name: 'Adm' })
        ).rejects.toHaveProperty(
          'message',
          'O nome precisa ter pelo menos 4 caracteres'
        );
      }
    );
  });

  describe('Find', () => {
    it('should find an existing cast', async () => {
      await castService.create({
        name: 'zambs'
      });

      const expected = { name: 'zambs' };
      expect(await castService.find(0)).toEqual(
        expect.objectContaining(expected)
      );
    });

    it('should ot find an inexistent cast', async () => {
      await castService.create({
        name: 'zambs'
      });
      expect(await castService.find(1)).toEqual(null);
    });
  });
});