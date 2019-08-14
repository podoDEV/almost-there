const SERVER_DOMAIN = 'http://13.209.89.169:9090';

export const getMembers = () => `${SERVER_DOMAIN}/members`;

export const getGroup = (groupId) => `${SERVER_DOMAIN}/groups/${groupId}`;
