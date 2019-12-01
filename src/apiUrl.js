const SERVER_DOMAIN = 'http://13.209.89.169:9090/api';

export const getMembers = (uuid) => `${SERVER_DOMAIN}/members?uuid=${uuid}`;

export const login = () => `${SERVER_DOMAIN}/login`;

export const getMember = (id) => `${SERVER_DOMAIN}/members/${id}`;

export const membersMe = () => `${SERVER_DOMAIN}/members/me`;

export const postMembers = () => `${SERVER_DOMAIN}/members`;

export const getGroups = () => `${SERVER_DOMAIN}/groups`;

export const getGroup = (groupIdOrCode) => `${SERVER_DOMAIN}/groups/${groupIdOrCode}`;

export const updateLocation = (memberId) => `${SERVER_DOMAIN}/members/${memberId}/location`;

export const joinGroup = (memberId) => `${SERVER_DOMAIN}/members/${memberId}/groups/join`;

export const uploadImage = () => `${SERVER_DOMAIN}/members/me/profile-images`;
