# :game_die: Character-Sheet - ALPHA :game_die:

:crown: Quickly define the relationships between stats.  
:crown: Manage inventories, talents, equipment, etc.  
:crown: Create items, skills, buffs.  
:crown: Save and export modified sheets.

:triangular_flag_on_post: This library is **not** ready for consumption, nor is what is described below finalized.

## Getting Started

> Add the library to your project.

```sh
$ yarn add character-sheet
```

> Import it into your project

```js
import CharacterSheet from 'character-sheet';
```

## Make a Character Sheet
```js
// import the library
import CharacterSheet from 'character-sheet';

// Generate a new CharacterSheet Class
const TableDungeons = CharacterSheet();

// define constitution
TableDungeons.define('constitution').initially(10);

// hp is based on constitution
TableDungeons
  .define('hp')
  .initially(25)
  .using('constitution')
    .calculate((currentValue, constitution) {
      return currentValue + constitution * 10;
    });

// create a sheet for a player / monster
const sirKnight = new TableDungeons();

// check what sirKnight's hp is
sirKnight('hp').is(); // 125
```

## Export it
```js
// export the sheet as an object
const exportedSheet = sirKnight.export(); // { constitution: 10, hp: 125 }
```

## *Define* API
> Used to define base stats. Placed on the CharacterSheet instead of the character, these represents all mechanical aspects of a sheet.

### Features
- Define a stat
  - Describe a stat (`Object`, `Number`, `Boolean`, `String`, `Array`)
  - Describe an inventory (`Array`)
  - Prescribe an initial value (`Object`, `Number`, `Boolean`, `String`, `Array`)
  - Perform math operations in sequential layers
  - Use dependency injection to calculate absolute values based on other stats

### Functional Heirarchy
- define
  - describe
  - initially
    - add
    - subtract
    - divideBy
    - roundUp
    - roundDown
    - using
      - calculate

#### .define(*stat* `String`)
> Define a new **Stat** on a `CharacterSheet`

```js
// import the library
import CharacterSheet from 'character-sheet';

// generate a new CharacterSheet Class
const TableDungeons = CharacterSheet();

// generate a new CharacterSheet Class
TableDungeons

  // a stat named constitution
  .define('player-name')

  // initial value of 10
  .initially("Anonymous Player");

// a new character sheet
const sirKnight = new TableDungeons();

// get player name
sirKnight('player-name').is(); // "Anonymous Player"
```

#### .initially(*value* `String, Number, Array, or Boolean`)
> Set the initial value of the stat. The type of value cannot change once set.

- `String`, `Number`, and `Boolean` will behave as stats.
- `[]` will behave as an `Inventory`

```js
// import the library
import CharacterSheet from 'character-sheet';

// generate a new CharacterSheet Class
const TableDungeons = CharacterSheet();

// define an inventory
TableDungeons
  .define('bag-of-holding')
  .initially([]);

// define a string
TableDungeons
  .define('player-name')
  .initially('');

// define a number
TableDungeons
  .define('strength')
  .initially(10);

// define a boolean
TableDungeons
  .define('poisoned')
  .initially(false);
```

#### .add | .subtract | .divideBy (*value* `String or Number`)
> Math.
- `String` will add the computed value of another stat.
- `Number` will add a static value.

```js
// import the library
import CharacterSheet from 'character-sheet';

// generate a new CharacterSheet Class
const TableDungeons = CharacterSheet();

// a new character sheet
const sirKnight = new TableDungeons();

// generate a new CharacterSheet Class
TableDungeons

  // a stat named constitution
  .define('constitution')

  // initial value of 10
  .initially(10);

// generate a new CharacterSheet Class
TableDungeons

  // a stat named hp
  .define('hp')

  // initially 100
  .initially(100)

  // + whatever constitutions calculated value is
  .add('constitution')
  
  // + 25
  .add(25);
```

#### .roundUp(), .roundDown()
> Make sure any value is a whole number, with the respective rule to describe which way to round.
- `String` will add the computed value of another stat.
- `Number` will add a static value.

@TODO: Add Code Sample

## *Inventory* API
> A storage mechanism that contains modifiers, defined in the CharacterSheet, and accessed on the character.

### Features
- Add a modifier of desired quantity
- Filter through all modifiers
  - Destroy modifiers
  - Move modifiers to different inventories
  - Switch modifiers on and off
- Switch inventories on and off

### Functional Heirarchy
- give
  - of
- filter
  - destroy
  - moveTo
  - on
  - off
- on
- off

## *Modifier* Definition API
> Modifier definitions represent templates of modifiers, that can be added to inventories. They not in effect until added to an inventory that is `on`.

### Features
- Create a modifier template which can be placed into any inventory
- Describe which stat to modify and augment it with sequential mathematical operations
- Switch default on or off

### Functional Heirarchy
- modifier
  - modifies
    - add
    - subtract
    - divideBy
    - roundDown
    - roundUp
    - on
    - off

## *Modifier* API
> Modifiers are placed exclusively on the character, and not on the CharacterSheet. They represent any mechanical adjustments to stats during computation.

### Features
- Switch on or off
- Move to another inventory
- Destroy
- Duplicate and place in desired inventory

### Functional Heirachy
- on
- off
- moveTo
- destroy
- duplicate
  - to

## Example Character Sheets

### Example 1: Dungeons and Dragons - Stat Modifiers
Let's replicate the functionality of Dungeons and Dragons style stat modifiers. The rule is: whatever your stat is, your stat modifier is that number divided by 2, rounded down, subtract 5.

For example:
- Stat is **15** 
- 15 / 2 = **7.5**
- Round Down 7.5 = **7**
- 7 - 5 = **2** 
- Stat Modifier is **2**.

> Let's build our CharacterSheet Class, called `TableDungeons`.

```js
// import the library
import CharacterSheet from 'character-sheet';

// generate a new CharacterSheet Class
const TableDungeons = CharacterSheet();

// define whatever stats to attach to CharacterSheet Class
const stats = ['strength', 'dexterity', 'charisma'];

// loop over each stat - 'strength', 'dexterity', 'charisma'
stats.forEach(stat => {
  
  // define the stat - ex: 'strength'
  TableDungeons
    .define(stat)
    .initially(10);

  // define that stat modifier - ex: 'strength-modifier'
  TableDungeons

    // define the stat
    .define(`${stat}-modifier`)

    // set its initial value
    .initially(0)

    // pull stat into the calculation context
    .using(stat)

    // caclulate the final value
    .calculate(stat => (stat / 2) - 5);
});
```

> Let's create our `CharacterSheet Instance` of the `CharacterSheet Class` called `sirKnight`.

```js
// sirKnights previously exported sheet
const savedSheet = {
  strength: 8,
  dexterity: 10,
  charisma: 18
};

// instantiate a character sheet for a player
const sirKnight = new TableDungeon(savedSheet);

// the modifiers are calculated and vailable for query
sirKnight('strength-modifier').is();  // -1
sirKnight('dexterity-modifier').is(); //  0
sirKnight('charisma-modifier').is();  //  4
```

### Example 2: Talents, Equipment, and Inventory
In most table top games, there are ways to augment your character as you go. These kinds of things can include **inventory**, **spells**, **equipment**, **talents**, and so on. 

In this example we'll work with **passive talents**, active **equipment**, and an **inventory** which holds items not currently equipped.

> Let's build our CharacterSheet Class, called `TableDungeons`.

```js
// import the library
import CharacterSheet from 'character-sheet';

// generate a new CharacterSheet Class
const TableDungeons = CharacterSheet();
```

> We'll add 3 inventories, with an `initially()` of `[]` to indiciate that these will hold modifiers.

```js
// holds items that are not actively in use - we'll turn this one off()
TableDungeons.define('inventory').initially([]).off();

// holds passive talents, on() by default
TableDungeons.define('passive-talents').initially([]);

// holds items that are actively in use, on() by default
TableDungeons.define('equipment').initially([]);

// health
TableDungeons.define('hp').initially(100);

// mana
TableDungeons.define('mana').initially(250);
```

> We'll instantiate our good sir knight

```js
// instantiate a character sheet for a player
const sirKnight = new TableDungeon();
```

> Let's create some modifiers that `sirKnight` will be able to consume

```js
// create the Wand of Power
sirKnight

  // let's give it a descriptive name
  .modifier('1h/wand-of-power')

  // and modify mana
  .modifies('mana')

  // by adding 100 to it
  .add(100);

// no change - we have to give sirKnight
// a wand in order for him to gain its bonus
sirKnight('mana').is(); // 250
```

> We'll equip the Wand of Power

```js
// select the equipment inventory
sirKnight('equipment')

  // sirKnight will gain 1
  .give(1)

  // Wand of Power
  .of('1h/wand-of-power');

// the bonus is now being applied
sirKnight('mana').is(); // 350
```

> Let's take the wand off for now

```js
// select the equipment inventory
sirKnight('equipment')

  // find the 1h/wand-of-power
  .findOne('1h/wand-of-power')

  // and move to the inventory
  .giveTo('inventory');

// because inventory is .off()
// the Wand of Power no longer
// affects mana.
sirKnight('mana').is(); // 250
```

> The same thing can be done with talents.

```js
// create the talent: Sturdy and Stout
sirKnight

  // give it a descriptive namespace
  .modifier('talent/sturdy-and-stout')

  // modifies hp
  .modifies('hp')

  // adds 50 to hp
  .add(50)

  // also modifies mana
  .modifies('mana')

  // subtracts 50 from mana
  .subtract(50);

// select sigKnight's equipment
sirKnight('passive-talent')
  
  // give 1
  .give(1)
  
  // Study and Stout
  .of('talent/sturdy-and-stout');

// it behaves just like the equipment
// inventory. talents and items are really
// the same thing. :)~
sirKnight('hp').is(); // 150
sirKnight('mana').is(); // 200
```