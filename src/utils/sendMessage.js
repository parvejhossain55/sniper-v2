const axios = require('axios');
const token = process.env.BOT_TOKEN;

const sendMessage = async ({ userId, text }) => {
	if (!token) {
		console.error('Bot token is not defined');
		return;
	}
	if (!userId || !text) {
		console.error('userId and text are required parameters');
		return;
	}

	const url = `https://api.telegram.org/bot${token}/sendMessage`;

	const params = {
		chat_id: Number(userId),
		text,
	};

	const sendRequest = async (retryCount = 3) => {
		try {
			const response = await axios.get(url, { params });
			console.log(`Message sent successfully to userId: ${userId}`);
			return response;
		} catch (error) {
			if (retryCount <= 0) {
				console.error(`Failed to send message to userId: ${userId}`, error.message);
				return null;
			}
			console.warn(`Retrying message send to userId: ${userId}, attempts left: ${retryCount - 1}`);
			return sendRequest(retryCount - 1);
		}
	};

	return sendRequest();
};

module.exports = sendMessage;
