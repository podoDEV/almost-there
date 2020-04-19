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

export function getThumbColor(index) {
  const colorSet = [
    '#292349',
    '#4528ba',
    '#bab1d8',
    '#fed701',
    '#02c9da',
    '#962752',
    '#7b47ba',
    '#eed887',
    '#0251d6',
    '#027a93',
    '#da756d',
    '#fbadbd',
    '#e25822',
    '#9399ff',
    '#216353',
    '#be79df',
    '#ff1e56',
    '#6decb9',
    '#6807f9',
    '#5b0909'
  ];

  return colorSet[index % colorSet.length];
}
