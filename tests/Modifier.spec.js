import Modifier from '../src/Modifier';
import Op from '../src/operations';

describe('Modifier', () => {
  it('exists', () => {
    const mod = new Modifier();
    expect(mod instanceof Modifier).toBe(true);
  });

  describe('Modifier.from()', () => {});

  let modifier;
  beforeEach(() => (modifier = new Modifier()));

  describe('get .operations', () => {
    it('returns operations', () => {
      expect(modifier.operations).toBe(modifier._operations);
    });
  });

  describe('get .description', () => {
    it('returns the modifier description', () => {
      expect(modifier.description).toBe(modifier._description);
    });
  });

  describe('.describe()', () => {
    it('sets the description of the modifier', () => {
      modifier.describe('abc');
      expect(modifier._description).toBe('abc');
    });
  });

  describe('.modifies()', () => {
    it('applies the "Modifies" operator', () => {
      modifier.modifies('abc');
      expect(modifier.operations).toMatchObject([new Op.Modifies('abc')]);
    });
  });

  describe('.add()', () => {
    it('applies the "Add" operator', () => {
      modifier.add('abc');
      expect(modifier.operations).toMatchObject([new Op.Add({ value: 'abc' })]);
    });
  });

  describe('.subtract()', () => {
    it('applies the "Subtract" operator', () => {
      modifier.subtract('abc');
      expect(modifier.operations).toMatchObject([
        new Op.Subtract({ value: 'abc' })
      ]);
    });
  });

  describe('.divideBy()', () => {
    it('applies the "DivideBy" operator', () => {
      modifier.divideBy('abc');
      expect(modifier.operations).toMatchObject([
        new Op.DivideBy({ value: 'abc' })
      ]);
    });
  });

  describe('.roundUp', () => {
    it('applies the "RoundUp" operator', () => {
      modifier.roundUp('abc');
      expect(modifier.operations).toMatchObject([
        new Op.RoundUp({ value: 'abc' })
      ]);
    });
  });

  describe('.roundDown()', () => {
    it('applies the "Subtract" operator', () => {
      modifier.roundDown('abc');
      expect(modifier.operations).toMatchObject([
        new Op.RoundDown({ value: 'abc' })
      ]);
    });
  });

  describe('.calculate()', () => {
    it('applies the "Subtract" operator', () => {
      const fn = () => {};
      modifier.calculate(fn);
      expect(modifier.operations).toMatchObject([
        new Op.Calculate({ value: 'abc' })
      ]);
    });
  });

  describe('.import()', () => {});

  describe('.export()', () => {});
});
