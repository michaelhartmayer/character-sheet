import CharacterSheet from "../../src/character-sheet";

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
    name: "strength"
  },
  {
    name: "dexterity"
  },
  {
    name: "constitution"
  },
  {
    name: "intelligence"
  },
  {
    name: "wisdom"
  },
  {
    name: "charisma"
  }
];

// Constants: Skills
const SKILLS = [
  { name: "acrobatics", stat: "dexterity" },
  { name: "animal_handling", stat: "wisdom" },
  { name: "arcana", stat: "intelligence" },
  { name: "athletics", stat: "strength" },
  { name: "deception", stat: "wisdom" },
  { name: "history", stat: "intelligence" },
  { name: "insight", stat: "wisdom" },
  { name: "intimidation", stat: "charisma" },
  { name: "investigation", stat: "intelligence" },
  { name: "medicine", stat: "wisdom" },
  { name: "nature", stat: "intelligence" },
  { name: "perception", stat: "wisdom" },
  { name: "performance", stat: "charisma" },
  { name: "persuasion", stat: "charisma" },
  { name: "religion", stat: "intelligence" },
  { name: "sleight_of_hand", stat: "dexterity" },
  { name: "stealth", stat: "dexterity" },
  { name: "survival", stat: "wisdom" }
];

/* Meta */
DND5E.define("character_name").default("");
DND5E.define("player_name").default("");
DND5E.define("class").default("");
DND5E.define("background").default("");
DND5E.define("faction").default("");
DND5E.define("race").default("");
DND5E.define("alignment").default("");

/* Base */
DND5E.define("experience")
  .default(0)
  .describe({ name: "Experience", description: "Your characters' Experience" });

DND5E.define("level")
  .default(1)
  .describe({ name: "Level", description: "Your characters' Level" })
  .using("experience")
  .calculate(exp => {
    for (let i = 0; i < XP.length; i++) {
      if (XP[i] < exp) continue;
      return i + 1;
    }

    return 20;
  });

/* Abilities */
DND5E.define("inspiration").default(0);
DND5E.define("proficiency_bonus")
  .default(0)
  .using("level")
  .calculate(level => Math.floor(level / 4) + 2);

/* Passive Wisdom */
DND5E.define("passive_perception")
  .default(10)
  .using("wisdom_modifier", "proficiency_bonus")
  .calculate((mod, prof) => 10 + mod + prof);

/* Stats */
STATS.forEach(stat => {
  const { name, ...rest } = stat;

  // "stat"
  DND5E.define(name).default(10);

  // "stat_modifier"
  DND5E.define(`${name}_modifier`)
    .default(0)
    .using(name)
    .calculate(stat => Math.floor(stat / 2) - 5);

  // "stat_saving_throw_proficient"
  DND5E.define(`${name}_saving_throw_proficient`).default(false);

  // "stat_saving_throw"
  DND5E.define(`${name}_saving_throw`)
    .default(0)
    .using(
      `${name}_saving_throw_proficient`,
      `${name}_modifier`,
      "proficiency_bonus"
    )
    .calculate((prof, mod, bonus) => (prof ? bonus + mod : mod));
});

/* Skills */
SKILLS.forEach(skill => {
  const { name, stat } = skill;

  // "skill"
  DND5E.define(name)
    .default(0)
    .using(`${name}_proficient`, `${stat}_modifier`, "proficiency_bonus")
    .calculate((prof, mod, bonus) => (prof ? bonus + mod : mod));

  // "skill_proficient"
  DND5E.define(`${name}_proficient`).default(false);
});

/* Dynamics */
DND5E.define("armor_class").default(10);

DND5E.define("initiative_modifier")
  .default(0)
  .using("dexterity_modifier")
  .calculate(mod => mod);

DND5E.define("speed").default(30);

/* Health */
DND5E.define("current_hitpoints").default(0);
DND5E.define("maximum_hitpoints").default(0);
DND5E.define("temporary_hitpoints").default(0);
DND5E.define("hit_dice_sides").default(8);

DND5E.define("hit_dice_available").default(1);
DND5E.define("hit_dice_total")
  .default(1)
  .using("level")
  .calculate(level => level);

DND5E.define("death_save_successes").default(0);
DND5E.define("death_save_failures").default(0);

/* Currency Inventories */
DND5E.define("currency_pp").default(0);
DND5E.define("currency_gp").default(0);
DND5E.define("currency_sp").default(0);
DND5E.define("currency_cp").default(0);

/* Modifier Inventories */
DND5E.define("weapons").default([]);
DND5E.define("attacks_and_spellcasting").default([]);
DND5E.define("features").default([]);
DND5E.define("traits").default([]);
DND5E.define("inventory").default([]);

let c = new DND5E(null || {});
c("strength").set(15);
console.log(c("strength").value());

export { XP, SKILLS, STATS };
export default DND5E;
