const { analyzeModifiedFeature } = require("../src/index.js");
const changeset3 = require("./fixtures/3.json");
const changeset4 = require("./fixtures/4.json");

describe("analyzeModifiedFeature", () => {
  it("returns only modified name tag for changeset3", () => {
    const result = {};
    for (const el of changeset3.elements) {
      analyzeModifiedFeature(el.tags, el.old.tags, result);
    }
    expect(result).toEqual({ name: ["mata nativa"] });
  });

  it("returns only the tag changes for changeset4", () => {
    const result = {};
    for (const el of changeset4.elements) {
      if (el.action === "modify") {
        analyzeModifiedFeature(el.tags, el.old.tags, result);
      }
    }
    expect(result).toEqual({
      entrance: ["yes"],
      short_name: ["CNBB"],
      surface: ["asphalt", "paved"],
      wikidata: ["Q3686567"],
      wikipedia: ["pt:Conferência Nacional dos Bispos do Brasil"],
    });
  });
});
