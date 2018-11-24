import stub from "./stubs/dnd5e-player.json";
import DND5E from "./mocks/dnd5e";

describe("Player Tests", () => {
  let player;
  beforeEach(() => (player = new DND5E(stub)));

  describe("query", () => {
    it("queries the read in value correctly", () => {
      expect(player("strength").value()).toEqual(stub.strength);
    });
  });

  describe(".getSheet()", () => {
    it("reads the sheet", () => {
      expect(player.getSheet()).toMatchObject(stub);
    });
  });
});
