const roles = ['user', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['getUsers', 'getPosts', 'managePosts', 'sendMessages', 'getMessages']);
roleRights.set(roles[1], ['getUsers', 'manageUsers', 'getPosts', 'managePosts', 'sendMessages', 'getMessages']);

module.exports = {
  roles,
  roleRights,
};
