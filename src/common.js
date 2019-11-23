export function removeElementFromArray(arr, index) {
  return arr.slice(0, index).concat(arr.slice(index + 1));
}

export const preview = {
  uri:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
};
