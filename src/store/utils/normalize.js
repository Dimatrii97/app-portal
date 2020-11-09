import Vue from "vue";
import { hasOwnProperty } from "./helper";
function checkingUpdate(stateProperty, newProperty) {
  for (const key in newProperty) {
    if (
      hasOwnProperty(stateProperty[newProperty.id], key) &&
      stateProperty[newProperty.id][key] === newProperty[key]
    )
      continue;
    else {
      if (key !== "id")
        Vue.set(stateProperty[newProperty.id], key, newProperty[key]);
    }
  }
}

export function normalizeState(
  stateProperty,
  newProperty,
  objectName,
  nameNewId
) {
  if (hasOwnProperty(stateProperty, objectName)) {
    checkingUpdate(stateProperty, newProperty);
  } else {
    Vue.set(stateProperty, objectName, newProperty);
    if (nameNewId) {
      Vue.set(stateProperty[objectName], nameNewId, newProperty.id);
    }
    Vue.delete(stateProperty[objectName], "id");
  }
}

export function normalizeRelations(data, property) {
  return data.reduce((acc, item) => (acc[item.id] = item[property]), {});
}
