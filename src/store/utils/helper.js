export function checkForStrMatching(str, checkStr) {
  return checkStr.toLowerCase().includes(str.toLowerCase());
}
export function findLocalUsersByIdName(arrayId, srtSearch, users) {
  return arrayId.reduce((found, id) => {
    if (checkForStrMatching(srtSearch, users[id].name)) {
      found.push(users[id]);
    }
    return found;
  }, []);
}
export function hasOwnProperty(obj={}, property) {
  try {
    return Object.prototype.hasOwnProperty.call(obj, property);
  } catch (error) {
    throw new Error("hasOwnProperty");
  }
 
}
