import CharacterSheet from '../../src/';

const DummySheet = CharacterSheet();

DummySheet.define('int').describe({
  name: 'Intelligence',
  description: 'A measure of cognitive ability.'
}).initially(0);

DummySheet.define('mana').describe({
  name: 'Mana',
  description: 'Consumable energy for spell casting and magical abilities.'
}).initially(0).using('int').calculate((b, int) => b += int * 10);

DummySheet.inventory('equipment');

const MagicRing = new CharacterSheet.Modifier().describe({
  name: 'Magic Ring +1',
  description: 'A powerful magical relic that enhances its wearers ability.'
}).modifies('int').add(1).modifies('mana').add(25);

describe('functional test: basic', () => {
  let character;

  beforeEach(() => character = new DummySheet());

  it('simple character stat manipulation', () => {
    // base value
    expect(character('mana').is()).toBe(0);
    
    // character receives 25 permanent mana
    character('mana').is(25);

    // modified base value
    expect(character('mana').is()).toBe(25);

    // character puts on 2 rings
    character.inventory('equipment').give(2).of(MagicRing);

    // 25 + (1 int * 10) + 25 + (1int * 10) + 25
    expect(character('mana').is()).toBe(95);
  });

  it('importing and exporting', () => {
    // character receives 25 permanent mana
    character('mana').is(25);

    // export
    const exported = character.export();

    // import to new sheet
    const newCharacter = DummySheet.from(exported);

    // are they the same?
    expect(exported).toMatchObject(newCharacter.export());

    // copy exported obj
    let modifiedExported = { ...exported };

    // manually adjust set mana
    modifiedExported.character.mana.set = 125;

    // import to new sheet
    const modifiedImportedCharacter = DummySheet.from(modifiedExported);

    // make sure the value took
    expect(modifiedImportedCharacter('mana').is()).toBe(125);
  });
});
