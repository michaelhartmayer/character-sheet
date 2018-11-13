const CS = require("../dist/character-sheet.js");

let Sheet = CS();

Sheet.define("a").default(1);
Sheet.define("b").default([]);

let character = new Sheet();

console.log(character.getSheet());
