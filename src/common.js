export function removeElementFromArray(arr, index) {
  return arr.slice(0, index).concat(arr.slice(index + 1));
}

export function isOwner(members, id) {
  return members.find((member) => member.id === id).authority === 'OWNER';
}

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function isExistProfilePhoto(url) {
  const noPhoto =
    'https://s3.ap-northeast-2.amazonaws.com/com.podo.almostthere/c4981f88-056b-4b7c-b7f3-5db4b28d7a07';

  return url !== noPhoto;
}
