"use strict";

function createTagDiff(changesetJson) {
  if (!changesetJson || !changesetJson.elements) return {};
  const result = {};

  changesetJson.elements.forEach((el) =>
    analyzeFeature(
      el.tags || {},
      el.old && el.old.tags ? el.old.tags : {},
      result
    )
  );
  return result;
}

function analyzeFeature(newVersion, oldVersion, result) {
  const oldVersionKeys = Object.keys(oldVersion);
  const newVersionKeys = Object.keys(newVersion);
  const addedTags = newVersionKeys.filter(
    (tag) => oldVersionKeys.indexOf(tag) === -1
  );
  const deletedTags = oldVersionKeys.filter(
    (tag) => newVersionKeys.indexOf(tag) === -1
  );
  const changedValues = newVersionKeys
    .filter(
      (tag) => addedTags.indexOf(tag) === -1 && deletedTags.indexOf(tag) === -1
    )
    .filter((tag) => newVersion[tag] !== oldVersion[tag]);

  addedTags.forEach((tag) => {
    addTagValue(result, tag, { new: newVersion[tag] });
  });
  deletedTags.forEach((tag) => {
    addTagValue(result, tag, { old: oldVersion[tag] });
  });
  changedValues.forEach((tag) => {
    addTagValue(result, tag, { new: newVersion[tag], old: oldVersion[tag] });
  });

  return result;
}

function addTagValue(obj, tag, value) {
  let containValue;

  if (!obj[tag]) {
    obj[tag] = [];
  }

  for (const t of obj[tag]) {
    if (t.new === value.new && t.old === value.old) {
      containValue = true;
    }
  }
  if (!containValue) {
    obj[tag].push(value);
  }
  return obj;
}

module.exports = { createTagDiff, addTagValue };
