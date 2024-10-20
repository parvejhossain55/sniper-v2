const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = crypto.scryptSync(process.env.PRIVATE_KEY_ENCRYPTION_SECRET, 'salt', 32);
const ivLength = 16;

const decryptPrivateKey = (encryptedKey) => {
	try {
		const iv = Buffer.from(encryptedKey.slice(0, ivLength * 2), 'hex');
		const encryptedText = Buffer.from(encryptedKey.slice(ivLength * 2), 'hex');

		const decipher = crypto.createDecipheriv(algorithm, key, iv);
		let decryptedData = decipher.update(encryptedText, 'hex', 'utf8');
		decryptedData += decipher.final('utf8');

		return decryptedData;
	} catch (error) {
		console.error('Error: Failed to decrypt privateKey:', error);
		return null;
	}
};

const encryptPrivateKey = (keyToEncrypt) => {
	try {
		const iv = crypto.randomBytes(ivLength);

		const cipher = crypto.createCipheriv(algorithm, key, iv);
		let encryptedData = cipher.update(keyToEncrypt, 'utf8', 'hex');
		encryptedData += cipher.final('hex');

		return iv.toString('hex') + encryptedData;
	} catch (error) {
		console.error('Error: Failed to encrypt privateKey:', error);
		return null;
	}
};

module.exports = { encryptPrivateKey, decryptPrivateKey };
