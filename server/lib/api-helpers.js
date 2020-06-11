module.exports = function extractUser(userData) {
  if (!userData.username) return null;
  return { _id: userData._id, username: userData.username };
}