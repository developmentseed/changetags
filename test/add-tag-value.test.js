const { addTagValue } = require('../src/index')

test('addTagValue returns correct results', () => {
  const obj = {};
  addTagValue(obj, 'building', { new: 'yes' });
  expect(obj.building[0].new).toBe('yes');

  addTagValue(obj, 'building', { new: 'yes' });
  expect(obj.building.length).toBe(1);

  addTagValue(obj, 'building', { old: 'no' });
  expect(obj.building[1].old).toBe('no');

  addTagValue(obj, 'building', { old: 'no' });
  expect(obj.building.length).toBe(2);

  addTagValue(obj, 'building', { new: 'yes', old: 'no' });
  expect(obj.building[2].old).toBe('no');
  expect(obj.building[2].new).toBe('yes');

  addTagValue(obj, 'surface', { new: 'paved', old: 'asphalt' });
  expect(obj.surface[0].old).toBe('asphalt');
  expect(obj.surface[0].new).toBe('paved');

  addTagValue(obj, 'surface', { new: 'paved', old: 'asphalt' });
  expect(obj.surface.length).toBe(1);
})
