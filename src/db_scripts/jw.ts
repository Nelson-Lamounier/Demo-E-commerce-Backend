import { randomBytes } from "crypto";

export const jwSecret = randomBytes(64).toString('hex');
console.log(jwSecret);