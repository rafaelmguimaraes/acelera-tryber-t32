import Character from '../../src/interfaces/character';
import { MemoryModel } from '../../src/models/memoryModel';
import { CharacterService } from '../../src/services/character';

let memoryModel: MemoryModel<Character>;
let characterService: CharacterService;

describe('Character Service', () => {
    beforeEach(() => {
        memoryModel = new MemoryModel();
        characterService = new CharacterService(memoryModel);
    });

    describe('Create', () => {
        it('should create a new character', async () => {
            // arrange
            const input = {
              name: 'Guima'
            };
            const expected = {
              name: 'Guima'
            };

            // act
            await characterService.create(input);

            // assert
            expect(await characterService.list()).toEqual(
              expect.arrayContaining([ expect.objectContaining(expected) ])
            );
          });

          it('should create throw an error when trying to create new character with invalid name',
            async () => {
              await expect(
                async () => await characterService.create({
                  name: 'X'
                })
              ).rejects.toHaveProperty(
                'message',
                'O nome precisa ter pelo menos 4 caracteres'
              );
            }
          );
    });
});