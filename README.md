# Character-Sheet 2.0

## Getting Started

> Add the library to your project.

```sh
$ yarn add character-sheet
```

> Import it into your project

```js
import CharacterSheet from 'character-sheet';
```

You can also import and CharacterSheet Classes that are prebuilt. (@TODO, Link to Contribute)

## CharacterSheet Factory

### `CharacterSheet()`

> Creates a new `CharacterSheet Class`. This generically represents your game's character sheet rules.

```js
// import the library
import CharacterSheet from 'character-sheet';

// generate a new CharacterSheet Class
const TableDungeons = CharacterSheet();
```

## CharacterSheet Class

### new CharacterSheet(optionalSheet `Object`) -> `ChainableQueryContext`

> Creates a `CharacterSheet Instance`. This represents your player or npc.

#### optionalSheet `Object`
A previously `.export()`'d `CharacterSheet Object`


```js
// import the library
import CharacterSheet from 'character-sheet';

// generate a new CharacterSheet Class
const TableDungeons = CharacterSheet();

// instantiate a character sheet for a player
const sirKnight = new TableDungeon();
```



### .define(key `String`) -> `ChainableContext`

> Define a new **Stat** on your `CharacterSheet Class`

### .export() -> `Object`

> Exports a JSON object of the



## Chainables

## CharacterSheet Object




## Examples

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

## Todo
- Inventories in inventories. Seriously, what do you do when you find a **bag of holds-a-lot**?
