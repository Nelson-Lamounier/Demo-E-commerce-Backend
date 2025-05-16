/** @format */

import bcrypt from "bcryptjs";

const password = "123456";
const hash = bcrypt.hashSync(password, 10);
const isValid = bcrypt.compareSync(password, hash);

console.log("bcryptjs loaded:", !!bcrypt.hashSync);
console.log("Password:", password);
console.log("Hash:", hash);
console.log("Password valid:", isValid);
