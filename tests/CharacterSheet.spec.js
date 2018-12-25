import CharacterSheet from '../src/CharacterSheet';
import Definition from '../src/Definition';

describe('CharacterSheet', () => {
  let ASheet;
  let aCharacter;

  beforeEach(() => {
    ASheet = new CharacterSheet();
    aCharacter = new ASheet();
  });

  it('generates a character sheet class', () => {
    const CharSheetClass = new CharacterSheet();
    expect(CharSheetClass).toBeTruthy();
  });

  /**
   * CharacterSheet.from()
   */
  describe('.from()', () => {
    let ASheet;
    beforeEach(() => {
      ASheet = new CharacterSheet();
    });

    it('exists', () => {
      expect(ASheet.from).toBeTruthy();
    });
  });

  /**
   * CharacterSheet.define()
   */
  describe('.define()', () => {
    it('exists', () => {
      expect(ASheet.define).toBeTruthy();
    });

    it('defines a stat', () => {
      expect(ASheet.define('stat').constructor === Definition);
    });
  });

  /**
   * CharacterSheet Instance
   */
  describe('CharacterSheet Instance', () => {
    it('instantiates a character sheet from the character sheet class', () => {
      expect(aCharacter).toBeTruthy();
    });

    /**
     * CharacterSheet Instance Selector
     */
    describe('sheet(selector)', () => {
      it('provides a selector function', () => {
        expect(typeof aCharacter === 'function').toBe(true);
      });

      it('selects a stat', () => {
        ASheet.define('stat').initially(123);
        expect(aCharacter('stat').is()).toBe(123);
      });
    });
  });
});
