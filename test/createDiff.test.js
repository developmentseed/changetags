const { createTagDiff } = require("../src/index.js");
const changeset1 = require("./fixtures/1.json");
const changeset2 = require("./fixtures/2.json");
const changeset3 = require("./fixtures/3.json");
const changeset4 = require("./fixtures/4.json");
const changeset5 = require("./fixtures/5.json");

describe("createTagDiff", () => {
  it("returns a new building=yes tag", () => {
    expect(createTagDiff(changeset1)).toEqual({ building: ["yes"] });
  });

  it("returns a change on the name tag", () => {
    expect(createTagDiff(changeset2)).toEqual({
      name: ["B2 Bike", "Bike Brothers"],
    });
  });

  it("returns a deleted tag", () => {
    expect(createTagDiff(changeset3)).toEqual({
      name: ["mata nativa"],
    });
  });

  it("returns correct result to a complex changeset", () => {
    expect(createTagDiff(changeset4)).toEqual({
      entrance: ["yes"],
      highway: ["street_lamp", "footway", "service"],
      short_name: ["CNBB"],
      surface: ["asphalt", "paved"],
      wikidata: ["Q3686567"],
      wikipedia: ["pt:Conferência Nacional dos Bispos do Brasil"],
    });
  });

  it("returns correct result to a complex changeset", () => {
    expect(createTagDiff(changeset5)).toEqual({
      alt_name: ["Livraria Leitura"],
      brand: [
        "Leitura",
        "O Boticário",
        "Casas Bahia",
        "Polishop",
        "Kopenhagen",
        "Bio Mundo",
      ],
      "brand:wikidata": [
        "Q6176628",
        "Q7073219",
        "Q5048048",
        "Q10350856",
        "Q10314624",
        "Q109562493",
      ],
      "brand:wikipedia": [
        "pt:Leitura (livraria)",
        "en:O Boticário",
        "en:Casas Bahia",
        "pt:Polishop",
        "pt:Kopenhagen",
      ],
      shop: [
        "perfumery",
        "cosmetics",
        "department_store",
        "furniture",
        "health_food",
        "convenience",
      ],
      amenity: ["cafe"],
    });
  });
});
