"use strict";

const mainTags = require("./mainTags.json");

/*
  Create the complete report of tags affected by a changeset
  @param {object} changesetJson - real-changeset representation of the changeset
  @returns {object) Result as an object
*/
function createTagDiff(changesetJson) {
  if (!changesetJson || !changesetJson.elements) return {};
  const result = {};

  changesetJson.elements
    .filter((el) => el.action === "modify")
    .forEach((el) => {
      analyzeModifiedFeature(
        el.tags || {},
        el.old ? el.old.tags || {} : {},
        result
      );
      // get also the main tags of the modified features
      getMainTags(el.tags, result);
      getMainTags(el.old.tags, result);
    });

  changesetJson.elements
    .filter((el) => el.action === "create")
    .forEach((el) => getMainTags(el.tags, result));

  changesetJson.elements
    .filter((el) => el.action === "delete")
    .forEach((el) => getMainTags(el.old.tags, result));

  return result;
}

/*
  Get all the tag changes in a feature. It's required to pass both the old and
  new version's tags.
  @param {object} newTags - new version's tags
  @param {object} oldTags - old version's tags
  @param {object} result - object to add the new key/values
*/
function analyzeModifiedFeature(newTags, oldTags, result) {
  const oldKeys = Object.keys(oldTags);
  const newKeys = Object.keys(newTags);

  const addedKeys = newKeys.filter((key) => oldKeys.indexOf(key) === -1);
  const deletedKeys = oldKeys.filter((key) => newKeys.indexOf(key) === -1);
  const changedValues = newKeys
    .filter(
      (key) => addedKeys.indexOf(key) === -1 && deletedKeys.indexOf(key) === -1
    )
    .filter((key) => newTags[key] !== oldTags[key]);

  addedKeys.forEach((key) => addKeyValue(key, newTags[key], result));
  deletedKeys.forEach((key) => addKeyValue(key, oldTags[key], result));
  changedValues.forEach((key) => {
    addKeyValue(key, newTags[key], result);
    addKeyValue(key, oldTags[key], result);
  });
}

/*
  Add a key and value to an object. The value will be added inside an array.
  It checks if the key and value are already present before adding it.
  @param {string} key
  @param {string} value
  @param {object} result - object to which the key/value will be added
*/
function addKeyValue(key, value, result) {
  if (!result[key]) {
    result[key] = [];
  }

  if (!result[key].includes(value)) {
    result[key].push(value);
  }
}

/*
  Filter the main tags and add it to the result object
  @param {object} tags - features' tags
  @param {object} result - object to which the tags will be added
*/
function getMainTags(tags, result) {
  const keys = Object.keys(tags);
  keys
    .filter((key) => mainTags.includes(key))
    .forEach((key) => addKeyValue(key, tags[key], result));
}

module.exports = {
  createTagDiff,
  analyzeModifiedFeature,
  addKeyValue,
  getMainTags,
};
