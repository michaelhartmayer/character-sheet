import Inventory from '../../character-sheet/src/Inventory';
import Modifier from '../../character-sheet/src/Modifier';

describe('Inventory', () => {
    describe('Inventory.from()', () => {
        it('creates an empty inventory', () => {
            const inv = Inventory.from();
            expect(inv instanceof Inventory).toBe(true)
        });
    });

    let inventory;
    beforeEach(() => inventory = new Inventory());

    describe('get .description', () => {
        it('returns the inventory description', () => {
            inventory.describe('abc');
            expect(inventory.description).toBe('abc')
        });
    });

    describe('get .modifiers', () => {
        it('returns all modifiers in the inventory', () => {
            const mod1 = new Modifier();
            inventory.give(3).of(mod1);
            expect(inventory.modifiers).toMatchObject([mod1, mod1, mod1]);
        });
    });
    
    describe('get .size', () => {
        it('returns the size of an inventory', () => {
            const mod = new Modifier();
            expect(inventory.size).toBe(0);
            inventory.give(1).of(mod);
            expect(inventory.size).toBe(1);
        })
    })

    describe('.describe()', () => {
        it('sets the description of the inventory', () => {
            inventory.describe('abc');
            expect(inventory._description).toBe('abc');
        });
    });

    describe('.on()', () => {
        it('turns the inventory on', () => {
            inventory._active = false;
            inventory.on();
            expect(inventory._active).toBe(true);
        })
    });

    describe('.off()', () => {
        it('turns the inventory off', () => {
            inventory._active = true;
            inventory.off();
            expect(inventory._active).toBe(false);
        });
    })

    describe('.forEach()', () => {
        it('loops through an empty inventory', () => {
            let n = 0;
            inventory.forEach(() => n++);
            expect(n).toBe(0);
        });

        it('loops through a populated inventory', () => {
            let n = 0;
            inventory.give(1).of(new Modifier());
            inventory.forEach(() => n++);
            expect(n).toBe(1);
        });

        it('each modifier is the correct one', () => {
            const mod1 = new Modifier();
            const mod2 = new Modifier();
            inventory.give(1).of(mod1);
            inventory.give(1).of(mod2);
            inventory.forEach((m, i) => {
                switch (i) {
                    case 0:
                        expect(m).toBe(mod1);
                        break;
                    case 1:
                        expect(m).toBe(mod2);
                        break;
                }
            })
        })
    })

    describe('.prune()', () => {
        it('prunes through an empty inventory', () => {
            let n = 0;
            inventory.prune(() => n++);
            expect(n).toBe(0);
        });

        it('prunes nothing, if all return true', () => {
            const mod1 = new Modifier();
            const mod2 = new Modifier();

            inventory.give(3).of(mod1);
            inventory.give(3).of(mod2);

            inventory.prune(() => true);

            expect(inventory.size).toBe(6)
        });

        it('prunes selectively', () => {
            const mod1 = new Modifier().describe('carrot');
            const mod2 = new Modifier().describe('potato');

            inventory.give(3).of(mod1);
            inventory.give(3).of(mod2);

            inventory.prune(mod => mod.description !== 'carrot');
            inventory.forEach(mod => expect(mod).toBe(mod2));
        })
    });

    describe('.give()', () => {
        it('returns chainable .of()', () => {
            expect(inventory.give().of).toBeTruthy();
        });

        it('adds 1 by default', () => {
            const mod = new Modifier();
            inventory.give().of(mod)
            expect(inventory._modifiers).toMatchObject([mod]);
        })

        it('adds n when explicitly set', () => {
            const mod = new Modifier();
            inventory.give(3).of(mod);
            expect(inventory._modifiers).toMatchObject([mod, mod, mod])
        })
    });

    describe('.import', () => {
        it('sets defaults with no import data', () => {
            inventory.import();
            expect(inventory._modifiers).toMatchObject([]);
            expect(inventory._description).toBe(null);
            expect(inventory._active).toBe(true);
        })

        it('imports modifiers', () => {
            const mod1 = new Modifier();
            inventory.import({ modifiers: [mod1.export()] });

            expect(inventory._modifiers).toMatchObject([ mod1 ]);
            expect(inventory._description).toBe(null);
            expect(inventory._active).toBe(true);
        })

        it('imports description', () => {
            inventory.import({ description: '123' });

            expect(inventory._modifiers).toMatchObject([]);
            expect(inventory._description).toBe('123');
            expect(inventory._active).toBe(true);
        });

        it('imports active', () => {
            inventory.import({ active: false });

            expect(inventory._modifiers).toMatchObject([]);
            expect(inventory._description).toBe(null);
            expect(inventory._active).toBe(false);
        })
    });

    describe('.export()', () => {
        it('exports', () => {
            const exp = inventory.export();
            const mod = new Modifier();
            expect(exp).toMatchObject({
                modifiers: [],
                description: null,
                active: true
            })
            inventory.give(1).of(mod);
            const exp2 = inventory.export();
            expect(exp2).toMatchObject({
                modifiers: [mod.export()],
                description: null,
                active: true
            });
        })
    });
})