const SERVER_DOMAIN = 'http://13.209.89.169:9090/api';

export const getMembers = (uuid) => `${SERVER_DOMAIN}/members?uuid=${uuid}`;

export const login = () => `${SERVER_DOMAIN}/login`;

export const membersMe = () => `${SERVER_DOMAIN}/members/me`;

export const postMembers = () => `${SERVER_DOMAIN}/members`;

export const getGroup = (groupId) => `${SERVER_DOMAIN}/groups/${groupId}`;

export const updateLocation = (memberId) => `${SERVER_DOMAIN}/members/${memberId}/location`;
