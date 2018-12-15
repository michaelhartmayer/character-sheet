# Character-Sheet (Preview)

## Create a new Character Sheet Class
A character sheet class represents a game system. It contains all the rules to wire up any values that must be calculated.

```js
// create a new CharacterSheet Class
const TableDungeons = CharacterSheet();
```

## Define Stats and Rules
A stat represents a primitive value that you might find on a character sheet. Simple stats include `Number`, `String`, and `Boolean`. An empty array `[]` is also supported, to define inventories.

### .define(name `String`) -> ModifierChain `Object`
Define a stat by a name (`String`). The `ModifierChain` is returned in scope of the thing you have just defined, exposing other utilities.

```js
// create a new CharacterSheet Class
const TableDungeons = CharacterSheet();

// define a stat on it called 'mana'
TableDungeons.define('mana');
```

## ModifierChain `Object`

### .initially(value `Number or String or Boolean`)
Sets the initial value of this stat before calculations begin.

```js
// create a new CharacterSheet Class
const TableDungeons = CharacterSheet();

// define a stat
TableDungeons

  // call it called 'mana'
  .define('mana')
  
  // set its initial value to 100
  .initially(100);
```

### .add(value `Number`) -> ModifierChain `Object`
Adds an arbitrary value to the calculation.

#### .subtract(value, `Number`) -> ModifierChain `Object`
Behaves the same way but subtracts.

```js
// create a new CharacterSheet Class
const TableDungeons = CharacterSheet();

// define a stat
TableDungeons

  // call it called 'mana'
  .define('mana')
  
  // set its initial value to 100
  .initially(100)
  
  // add 25
  .add(25);
```

### .add(value `String`) -> ModifierChain `Object`
Adds the calculated value of `value` to the calculation.

#### .subtract(value, `String`) -> ModifierChain `Object`
Behaves the same way but subtracts.

```js
// create a new CharacterSheet Class
const TableDungeons = CharacterSheet();

// define a stat
TableDungeons

  // call it called 'mana'
  .define('mana')
  
  // set its initial value to 100
  .initially(100)
  
  // adds whatever 'intelligence-modifier' is
  .add('intelligence-modifier');
```

## Instantiate a Sheet for a Player
Once the CharacterSheet system has been fully defined, it's time to create / load character sheets up!

Here is our `CharacterSheet Class`:

```js
// create a new CharacterSheet Class
const TableDungeons = CharacterSheet();

// define a stat
TableDungeons

  // call it called 'mana'
  .define('mana')
  
  // set its initial value to 100
  .initially(100)
  
  // adds whatever 'intelligence-modifier' is
  .add('intelligence-modifier');


TableDungeons

  // character's name
  .define('character-name')

  // default name
  .initially('Evil Joe');


TableDungeons

  // intelligence is nice
  .define('intelligence')

  // start players off with 10
  .initially(10);


TableDungeons

  // a modifier we're going to base on intelligence
  .define('intelligence-modifier')

  // initially 0, and now also explicitly numeric
  .initially(0)

  // using intelligence to contextualize .forEvery()
  .using('intelligence')

  // for every 2 intelligence
  .forEvery(2)

    // rounding down
    .conservatively()

    // add 1
    .add(1)
  
  // also, subtract 5 from the total
  .subtract(5);
```

## Making a **new** character sheet.
Now that the `TableDungeons` (`CharacterSheet Class`) has been properly defined, we can instiate it for our players.

Stats are easy to set and get using the `StatSelector`.

```js
// make a new TableDungeons character sheet
const sirKnight = new TableDungeons();

// using the stat selector, select character-name
sirKnight('character-name')
  
  // set its value to 'JellyDoodle'
  .is('JellyDoodle');

// mana
const mana = sirKnight('mana').is();

// show the value in console
console.log(mana); // 100
```

## Advanced Features
So how do you add **spells**, **items**, and **class skills** to your character? With CharacterSheet all of these modifications are stored inside `Inventories`.

### Defining an Inventory
Define an `Inventory` on the `CharacterSheet Class`.

```js
TableDungeons
  
  // define skills
  .define('skills')

  // as an empty inventory
  .initially([]);
```

### Create `Modifiers` to add to your `Inventories`
`Modifiers` are added to the `CharacterSheet Instance` (not `Class`). This way they travel with the sheet, but do not impact anyone elses sheet.

Let's define a `modifier`.

```js
// create a new character sheet for a player
const sirKnight = new TableDungeons();

sirKnight

  // create a new modifier
  .modifier('holy-rejuvination')

  // describe what it modifies when it's active
  .modifies('intelligence')

  // add 2 to intelligence
  .add(2);
```

Now let's give `sirKnight` this **spell**. He'll also consume water (which is not represented in the code above, but you get the idea).

```js
// access the 'spells' Inventory
sirKnight('spells')

  // contextualizes the quantity
  .gains(1)

  // of the modifier given to this inventory
  .of('holy-rejuvination');


// an inventory named inventory ;)
sirKnight('inventory')

  // contextualizes the quantity
  .loses(2)

  // of the modifier removed from this inventory
  .of('water');
```

It's also possible to manipulate which modifiers are actively being consumed. Let's turn off all `fire-charm` modifiers that currently reside in the **spell** `Inventory`.

```js
// access the 'spells' inventory
sirKnight('spells')
  
  // find only active modifiers
  .dig(modifier => modifier.active == false)

  // that is are a 'fire-charm'
  .for('fire-charm')

  // map over them, turn them off
  .map(modifier => modifier.off())
```

## Todo
- Inventories in inventories. Seriously, what do you do when you find a **bag of holds-a-lot**?
