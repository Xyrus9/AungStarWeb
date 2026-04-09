import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin123",
    email: "admin@example.com",
    password: bcrypt.hashSync("Admin123", 10),
    isAdmin: true,
  },
];
export default users;