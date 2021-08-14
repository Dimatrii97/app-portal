export function uniqBy(arr1 = [], arr2 = [], property) {
  return arr1.concat(arr2).filter((el, i, arr) => {
    return arr.findIndex(mainEl => mainEl[property] === el[property]) === i
  })
}
export function groupBy(arr1 = [], arr2 = [], property) {
  return arr1.concat(arr2).filter((el, i, arr) => {
    return arr.findIndex(mainEl => mainEl[property] === el[property]) !== i
  })
}
export function saveUniqBy(arr1 = [], arr2 = [], property) {
  return uniqBy(groupBy(arr2, arr1, property), arr2, property)
}
