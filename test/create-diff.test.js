const { createTagDiff } = require('../src/index.js');
const changeset1 = require('./fixtures/1.json');
const changeset2 = require('./fixtures/2.json');
const changeset3 = require('./fixtures/3.json');
const changeset4 = require('./fixtures/4.json');

describe('createTagDiff', () => {
  it('returns a new building=yes tag', () => {
    expect(
      createTagDiff(changeset1)
    ).toEqual(
      {building: [{ new: 'yes' }]}
    );
  });

  it('returns a change on the name tag', () => {
    expect(
      createTagDiff(changeset2)
    ).toEqual(
      {name: [{ new: 'B2 Bike', old: 'Bike Brothers' }]}
    );
  });

  it('returns a deleted tag', () => {
    expect(
      createTagDiff(changeset3)
    ).toEqual(
      {name: [{ old: 'mata nativa' }]}
    );
  });

  it('returns correct result to a complex changeset', () => {
    expect(
      createTagDiff(changeset4)
    ).toEqual(
      {
        entrance: [{ new: 'yes' }, { new: 'main'}],
        highway: [{ new: 'street_lamp' }, { new: 'footway'}, { new: 'service' }],
        service: [{ new: 'parking_aisle' }],
        short_name: [{ new: 'CNBB' }],
        surface: [{ new: 'asphalt' }, { new: 'asphalt', old: 'paved' }],
        wikidata: [{ new: 'Q3686567' }],
        wikipedia: [{ new: 'pt:Conferência Nacional dos Bispos do Brasil' }],
      }
    );
  });
});
