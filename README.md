# :game_die: Character-Sheet: Beta :game_die:

:crown: Quickly define the relationships between stats.  
:crown: Manage inventories, talents, equipment, etc.  
:crown: Create items, skills, buffs.  
:crown: Save and export modified sheets.

:triangular_flag_on_post: This library is still in beta.

## Concepts

**Sheet**
- A sheet is used to define stats.
- Stats may have computable relationships between them.
- For example: **hitpoints** can be based off of **constitution**.

**Character**
- A character is one instance of a sheet. 
- Characters may assign values to stats.
- For example: You may set **constitution** from _8_ to _10_, which will cause **hitpoints** to rise from _80_ to _100_.

**Stats**
- A stat is a single named property on a character.
- Computed stats must be numerical, but sheets may also store other types of information.
- For example: **player level**, **character name**, or **experience**.

**Modifiers**
- Modifiers allow you to define sets of modifications to stats on a character.
- They can be added or removed at any time.
- For example: **talents**, **equipment**, **spells**, **items**, and **buffs**.

**Inventory**
- Inventories hold modifiers that are applied to a character.
- Inventories may also serve as storage for modifiers that are set to inactive.
- Example inventories: **equipment**, **active effects**, **bags**, or **class features**.

## Design a Sheet
In the below snippet you will learn how to:
- Generate a sheet
- Define some stats

```js
// import the library
import CharacterSheet from 'character-sheet';

// generate a new sheet called "TableDungeons"
const TableDungeons = CharacterSheet();

// define constitution
TableDungeons.define('constitution').initially(10);

// hp is based on constitution
TableDungeons
  .define('hp')
  .initially(0)
  .using('constitution')
    .calculate((currentValue, constitution) => {
      return currentValue + constitution * 10;
    });
```

## Create a Character
A continuation of the previous example, here we'll:
- Create a character
- Derive a stats' computed value

```js
// create a character called sirKnight
const sirKnight = new TableDungeons();

// check what sirKnight's hp is
sirKnight('hp').is(); // 125
```

## Save a Character
After a sheet has been designed, and a character created, it can be exported and stored.

```js
// export the sheet as an object
const exportedSheet = sirKnight.export(); // { ... constitution: 10, hp: 125 }
```

**For in depth examples see below.**

## *Define* API
- Used to define base stats on a Sheet

```js
// define constitution
TableDungeons.define('constitution').initially(10);
```

### Chainable Heirarchy
- `.define()`
  - `.describe()`
  - `.initially()`
  - `.add()`
  - `.subtract()`
  - `.divideBy()`
  - `.roundUp()`
  - `.roundDown()`
  - `.calculate()`
  - `.using()`
    - `.calculate()`

#### .define(*stat* `String`)
> Define a **stat** on a Sheet

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

#### .initially(*value* `String | Number | Boolean`)
> Set the initial value of the *stat*. The type of value cannot change once set.

```js
// import the library
import CharacterSheet from 'character-sheet';

// generate a new Sheet
const TableDungeons = CharacterSheet();

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

#### .add | .subtract | .divideBy (*value* `String | Number`)
> Mathematical operation
- `String` will add the computed value of another stat.
- `Number` will add a static value.

```js
// import the library
import CharacterSheet from 'character-sheet';

// generate a new Sheet
const TableDungeons = CharacterSheet();

// create a new character
const sirKnight = new TableDungeons();


TableDungeons

  // define a stat named constitution
  .define('constitution')

  // initial value of 10
  .initially(10);

TableDungeons

  // define a stat named hp
  .define('hp')

  // initially 100
  .initially(100)

  // + whatever constitution's calculated value is
  .add('constitution')
  
  // + 25
  .add(25);
```

#### .roundUp(), .roundDown()
> Round to a whole number, with the respective rule to describe which way to round.

## *Inventory* API
> A storage mechanism that contains modifiers, defined in the CharacterSheet, and accessed on the character.

### Functional Heirarchy
- `.give()`
  - `.of()`
- `.filter()`
- `.prune()`
- `.remove()`
- `.move()`
  - `.to()`
- `.forEach()`
- `.on()`
- `.off()`

## *Modifier* API
> Modifiers represent templates of modifications, that can be added to inventories. They are not in effect until added to an inventory that is on.

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
