export function removeElementFromArray(arr, index) {
  return arr.slice(0, index).concat(arr.slice(index + 1));
}

export function isOwner(members, id) {
  return members.find((member) => member.id === id).authority === 'OWNER';
}
