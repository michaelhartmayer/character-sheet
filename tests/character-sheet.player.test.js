import stub from "./stubs/dnd5e-player.json";
import DND5E from "./mocks/dnd5e";

describe("Player Tests", () => {
  let player;
  beforeEach(() => (player = new DND5E(stub)));

  describe("query", () => {
    it("queries a loaded character sheet correctly", () => {
      expect(player("strength").value()).toEqual(stub.strength);
    });
  });

  describe(".getSheet()", () => {
    it("reads the sheet after it was loaded in", () => {
      expect(player.getSheet()).toMatchObject(stub);
    });
  });

  describe(".modifier()", () => {
    it("can add an item to a players inventory", () => {
      expect(player("strength").value()).toEqual(stub.strength);

      player
        .modifier("Paper Sword")
        // .describe({ name: "A Paper Sword" })
        .modifies("strength")
        .add(2);

      player("weapons").give("Paper Sword");

      expect(player("strength").value()).toBe(stub.strength + 2);
    });

    it("can add multiple items to a players inventory", () => {
      const mod = player("strength_modifier").value();

      player
        .modifier("Magic Gem")
        .modifies("strength_modifier")
        .add(1);

      player("inventory").give("Magic Gem", 5);

      expect(player("strength_modifier").value()).toBe(mod + 5);
    });
  });
});
