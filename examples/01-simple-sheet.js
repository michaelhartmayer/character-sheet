const CharacterSheet = require("../src/character-sheet");

// create a new Character Sheet System
const DungeonsAndDragons5E = CharacterSheet();

// create a new stat called "strength"
DungeonsAndDragons5E.define("strength")
  .describe({ name: "Strength", description: "A measure of physical force." })
  .default(0);

DungeonsAndDragons5E.define("level").default(1);

// create a stat that's calculated based on "strength"
DungeonsAndDragons5E.define("strength-modifier")
  .describe({
    name: "Strength Modifier",
    description: "Add to your strength based rolls."
  })
  .using("strength")
  .calculate(str => Math.floor(str / 2) - 5);

// create a stat called advantage
DungeonsAndDragons5E.define("advantage").default(false);

DungeonsAndDragons5E.define("special-mod")
  .using("strength", "level")
  .calculate((str, level) => str + level);

// instantiate an actual workable sheet
const myPlayersSheet = new DungeonsAndDragons5E();

// set strength value
myPlayersSheet("strength").set(14);

// enable advantage
myPlayersSheet("advantage").set(true);

// show all calculated values
const sheet = myPlayersSheet.getSheet();

// { strength: 14, 'strength-modifier': 2 }
console.log(sheet);
