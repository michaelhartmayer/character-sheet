# Character Sheet (Preview)
CharacterSheet library for assembling relationships between stats and modifiers.

## Getting Started
`npm i character-sheet`

## Creating a new Character Sheet System
```js
const CharacterSheet = require('character-sheet');

// create a new Character Sheet System
const DungeonsAndDragons5E = CharacterSheet();

// create a new stat called "strength"
DungeonsAndDragons5E.define("strength")
  .describe({ 
    name: "Strength", 
    description: "A measure of physical force." 
  })
  .default(0);

// create a stat that's calculated based on "strength"
DungeonsAndDragons5E.define("strength-modifier")
  .describe({
    name: "Strength Modifier",
    description: "Add to your strength based rolls."
  })
  .using("strength")
  .calculate(str => Math.floor(str / 2) - 5);

// instantiate an actual workable sheet
const myPlayersSheet = new DungeonsAndDragons5E();

// set strength value
myPlayersSheet("strength").set(14);

// show all calculated values
myPlayersSheet.getSheet(); // { strength: 14, 'strength-modifier': 2 }
```

## CharacterSheet()
### returns a new `Character Sheet Class`

## CharacterSheet Class
### define(name)

## CharacterSheet Class Instance
### modifier(name)

