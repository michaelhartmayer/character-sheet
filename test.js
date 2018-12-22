const CharacterSheet = require('./dist');

// new CharacterSheet Class
const DND5E = CharacterSheet();

// Constants: XP Table
const XP = [
	0,
	300,
	900,
	2700,
	6500,
	14000,
	23000,
	34000,
	48000,
	64000,
	85000,
	100000,
	120000,
	140000,
	165000,
	195000,
	225000,
	265000,
	305000,
	355000
];

// Constants: Stats
const STATS = [
	{
		name: 'strength'
	},
	{
		name: 'dexterity'
	},
	{
		name: 'constitution'
	},
	{
		name: 'intelligence'
	},
	{
		name: 'wisdom'
	},
	{
		name: 'charisma'
	}
];

// Constants: Skills
const SKILLS = [
	{ name: 'acrobatics', stat: 'dexterity' },
	{ name: 'animal-handling', stat: 'wisdom' },
	{ name: 'arcana', stat: 'intelligence' },
	{ name: 'athletics', stat: 'strength' },
	{ name: 'deception', stat: 'wisdom' },
	{ name: 'history', stat: 'intelligence' },
	{ name: 'insight', stat: 'wisdom' },
	{ name: 'intimidation', stat: 'charisma' },
	{ name: 'investigation', stat: 'intelligence' },
	{ name: 'medicine', stat: 'wisdom' },
	{ name: 'nature', stat: 'intelligence' },
	{ name: 'perception', stat: 'wisdom' },
	{ name: 'performance', stat: 'charisma' },
	{ name: 'persuasion', stat: 'charisma' },
	{ name: 'religion', stat: 'intelligence' },
	{ name: 'sleight-of-hand', stat: 'dexterity' },
	{ name: 'stealth', stat: 'dexterity' },
	{ name: 'survival', stat: 'wisdom' }
];

/* Meta */
DND5E.define('character-name').initially('');
DND5E.define('player-name').initially('');
DND5E.define('class').initially('');
DND5E.define('background').initially('');
DND5E.define('faction').initially('');
DND5E.define('race').initially('');
DND5E.define('alignment').initially('');

/* Base */
DND5E.define('experience')
	.initially(0)
	.describe({ name: 'Experience', description: "Your characters' Experience" });

DND5E.define('level')
	.initially(1)
	.describe({ name: 'Level', description: "Your characters' Level" })
	.using('experience')
	.calculate((v, exp) => {
		for (let i = 0; i < XP.length; i++) {
			if (XP[i] < exp) continue;
			return i + 1;
		}

		return 20;
	});

/* Abilities */
DND5E.define('inspiration').initially(0);
DND5E.define('proficiency-bonus')
	.initially(0)
	.using('level')
	.calculate((v, level) => Math.floor(level / 4) + 2);

/* Passive Wisdom */
DND5E.define('passive-perception')
	.initially(10)
	.using('wisdom-modifier', 'proficiency-bonus')
	.calculate((v, mod, prof) => 10 + mod + prof);

/* Stats */
STATS.forEach(stat => {
	const { name, ...rest } = stat;

	// "stat"
	DND5E.define(name).initially(10);

	// "stat-modifier"
	DND5E.define(`${name}-modifier`)
		.initially(0)
		.using(name)
		.calculate((v, stat) => Math.floor(stat / 2) - 5);

	// "stat-saving-throw-proficient"
	DND5E.define(`${name}-saving-throw-proficient`).initially(false);

	// "stat-saving-throw"
	DND5E.define(`${name}-saving-throw`)
		.initially(0)
		.using(`${name}-saving-throw-proficient`, `${name}-modifier`, 'proficiency-bonus')
		.calculate((v, prof, mod, bonus) => (prof ? bonus + mod : mod));
});

/* Skills */
SKILLS.forEach(skill => {
	const { name, stat } = skill;

	// "skill"
	DND5E.define(name)
		.initially(0)
		.using(`${name}-proficient`, `${stat}-modifier`, 'proficiency-bonus')
		.calculate((v, prof, mod, bonus) => (prof ? bonus + mod : mod));

	// "skill-proficient"
	DND5E.define(`${name}-proficient`).initially(false);
});

/* Dynamics */
DND5E.define('armor-class').initially(10);

DND5E.define('initiative-modifier')
	.initially(0)
	.using('dexterity-modifier')
	.calculate((v, mod) => mod);

DND5E.define('speed').initially(30);

/* Health */
DND5E.define('current-hitpoints').initially(0);
DND5E.define('maximum-hitpoints').initially(0);
DND5E.define('temporary-hitpoints').initially(0);
DND5E.define('hit-dice-sides').initially(8);

DND5E.define('hit-dice-available').initially(1);
DND5E.define('hit-dice-total')
	.initially(1)
	.using('level')
	.calculate((v, level) => level);

DND5E.define('death-save-successes').initially(0);
DND5E.define('death-save-failures').initially(0);

/* Currency Inventories */
DND5E.define('currency-pp').initially(0);
DND5E.define('currency-gp').initially(0);
DND5E.define('currency-sp').initially(0);
DND5E.define('currency-cp').initially(0);

/* Modifier Inventories */
DND5E.inventory('weapons');
DND5E.inventory('attacks-and-spellcasting');
DND5E.inventory('features');
DND5E.inventory('traits');
DND5E.inventory('inventory');

// export { XP, SKILLS, STATS };
// export default DND5E;

let Fin = new DND5E();

Fin.get('dexterity').is(12);

let dexMod = Fin.get('dexterity-modifier').is();

console.log(Fin.get('initiative-modifier').is());

// console.log(Fin.getSheet());
