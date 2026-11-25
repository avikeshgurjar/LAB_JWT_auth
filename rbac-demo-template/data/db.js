
const users = [
  { id: 1, username: "alice", password: "alice123", role: "admin" },
  { id: 2, username: "bob", password: "bob123", role: "moderator" },
  { id: 3, username: "carol", password: "carol123", role: "user" },
];

const posts = [
  { id: 1, title: "Hello World", authorId: 3 }, 
  { id: 2, title: "Moderator News", authorId: 2 }
];

module.exports = { users, posts };
