export const name = orderDirection => {
  return orderDirection
    ? (a, b) => a.title.localeCompare(b.title)
    : (a, b) => b.title.localeCompare(a.title);
};
export const map = (orderDirection, orderBy, map) => {
  return orderDirection
    ? (a, b) => map[b[orderBy]] - map[a[orderBy]]
    : (a, b) => map[a[orderBy]] - map[b[orderBy]];
};
export const date = (orderDirection, orderBy) => {
  return orderDirection
    ? (a, b) => new Date(b[orderBy] || 0) - new Date(a[orderBy] || 0)
    : (a, b) => new Date(a[orderBy] || 0) - new Date(b[orderBy] || 0);
};
