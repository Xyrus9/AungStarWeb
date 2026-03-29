import bcrypt from "bcryptjs";

const users = [
  {
    name: "admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("admin123", 10),
    isAdmin: true,
  },
];
export default users;