const { addKeyValue } = require("../src/index");

test("addKeyValue returns correct results", () => {
  const result = {};
  addKeyValue("building", "yes", result);
  expect(result.building).toContain("yes");

  addKeyValue("building", "yes", result);
  expect(result.building.length).toBe(1);

  addKeyValue("building", "no", result);
  expect(result.building).toContain("no");

  addKeyValue("building", "no", result);
  expect(result.building.length).toBe(2);

  addKeyValue("surface", "paved", result);
  addKeyValue("surface", "asphalt", result);
  expect(result.surface).toContain("asphalt");
  expect(result.surface).toContain("paved");

  addKeyValue("surface", "paved", result);
  expect(result.surface.length).toBe(2);
});
