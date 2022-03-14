const { getMainTags } = require("../src/index");
const changeset4 = require("./fixtures/4.json");

describe("getMainTags", () => {
  it("returns only the main tags", () => {
    const result = {};
    getMainTags({ building: "yes", name: "test" }, result);
    getMainTags(
      { amenity: "school", operator: "Test", level: 1, source: "no" },
      result
    );
    expect(result).toEqual({ building: ["yes"], amenity: ["school"] });
  });
});
