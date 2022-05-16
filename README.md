# changetags

[![npm version](https://badge.fury.io/js/changetags.svg)](https://badge.fury.io/js/changetags)

List the tags added, modified or deleted by an OpenStreetMap changeset.

It needs to receive the data in the `real-changesets` format ([example of a real-changesets file](https://s3.amazonaws.com/mapbox/real-changesets/production/118466156.json)).

The [osm-adiff-parser](https://github.com/mapbox/osm-adiff-parser) library can be used to produce `real-changesets` from OSM augmented diffs (`.osc` files).

## Purpose

The main purpose of this library is to input in [OSMCha](https://osmcha.org) database the OSM tags that were affected by a changeset. That way, users will be able to query OSMCha with key/value tag combinations.

## How it works

It uses two logics to determine the tags that will be included in the result.

### Created and deleted features

On features that were created or deleted in a changeset, it includes only the main tags ([check the list](./scr/mainTags.json)).

#### Examples:

- Changeset that added a new `building` with the following tags:

```
building=yes
building:levels=2
addr:housenumber=31
addr:street=Calle 13
name=The House
```

will have only `building=yes` as the result.

- Changeset that deleted a road with the following tags:

```
highway=primary
surface=asphalt
name=Spring Road
ref=CL-001
```

will have only `highway=primary` as the result.

### Modified features

We include the main tags of the modified features and also the tags that were modified.

#### Examples

- Changeset that modified the tags of a `bank` from:

```
amenity=bank
name=Unicaja Banco
operator=unicaja
```

to

```
brand=Unicaja Banco
brand:wikidata=Q2543704
brand:wikipedia=en:Unicaja
short_name=Unicaja
amenity=bank
name=Unicaja Banco
operator=unicaja
```

will have as the result:

```
brand=Unicaja Banco
brand:wikidata=Q2543704
brand:wikipedia=en:Unicaja
short_name=Unicaja
amenity=bank
```

- Changeset that modified the geometry of a stadium

If only the geometry changed, it will include only the main tag, so the result will be `leisure=stadium`.

## Data structure

The data returned by the `createTagDiff` function is an object whose each entry is an array.

```
{
  amenity: ["restaurant"],
  highway: ["service", "tertiary", "secondary_link", "footway"],
  surface: ["asphalt", "paved"],
  office: ["diplomatic"]
}
```

## Support

This library was funded by [Wikimedia Italia](https://wikimedia.it/).

## License

[MIT](./LICENSE)
