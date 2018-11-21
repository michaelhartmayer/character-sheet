import CharacterSheet from "../src/character-sheet";

describe("CharacterSheet()", () => {
  it("Works", () => {
    expect(true).toBe(true);
  });

  describe("CharacterSheet Base Functionality", () => {
    it("Instantiates a CharacterSheet Class", () => {
      const TestSheet = CharacterSheet();
      expect(TestSheet).toBeTruthy();
    });
  });

  describe("CharacterSheet Class Functionality", () => {
    let TestSheet;

    beforeEach(() => {
      TestSheet = CharacterSheet();
    });

    it("Instantiates a character", () => {
      const character = new TestSheet();
      expect(character).toBeTruthy();
    });

    describe(".define()", () => {
      it("exists", () => {
        expect(TestSheet.define).toBeTruthy();
      });

      it("defines a key", () => {
        TestSheet.define("a").default(5);
        let sheet = new TestSheet();

        expect(sheet("a").value()).toBe(5);
      });

      it("returns .default()", () => {
        expect(
          typeof TestSheet.define("a").default === "function"
        ).toBeTruthy();
      });
    });
  });

  describe("CharacterSheet Instance Functionality", () => {
    let TestSheet;
    let testSheet;

    beforeEach(() => {
      TestSheet = CharacterSheet();
      TestSheet.define("abc").default(123);
      testSheet = new TestSheet();
    });

    describe("testSheet(selector)", () => {
      it("selects", () => {
        expect(testSheet("abc")).toBeTruthy();
      });

      describe(".value()", () => {
        it("returns the correct value", () => {
          expect(testSheet("abc").value()).toBe(123);
        });
      });

      describe(".set()", () => {
        it(".set()", () => {
          testSheet("abc").set(111);
          expect(testSheet("abc").value()).toBe(111);
        });
      });
    });
  });
});
