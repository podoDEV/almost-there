export function removeElementFromArray(arr, index) {
  return arr.slice(0, index).concat(arr.slice(index + 1));
}
