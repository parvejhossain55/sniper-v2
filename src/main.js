const dotenv = require('dotenv');
const path = require('path');
const cron = require('node-cron');
const { ENV_MODE } = require('./config/index.js');
const envPath = path.join(__dirname, `${ENV_MODE === 'prod' ? '../.env.prod' : '../.env.dev'}`);
dotenv.config({ path: envPath });

const runBot = require('./bot/bot.js');
const store = require('./store');
const operations = require('./operations/index.js');

async function main() {
	// run the bot
	const bot = await runBot({ store });

	await operations({ store, bot });
}

main();
