const argon2 = require("argon2");
const crypto = require("crypto");
const util = require("util");

const getRandomBytes = util.promisify(crypto.randomBytes);

module.exports = {
    async hashPassword(plainPassword) {
        try {
            const salt = await getRandomBytes(32);
            const hash = await argon2.hash(plainPassword, { salt });
            return { salt, hash };
        } catch (error) {
            throw error;
        }
    },

    async verifyPassword(hashedPassword, plainPassword) {
        try {
            const isValid = await argon2.verify(hashedPassword, plainPassword);
            return isValid;
        } catch (error) {
            throw error;
        }
    }
}