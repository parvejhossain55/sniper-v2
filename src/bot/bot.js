const { Telegraf } = require('telegraf');
const { ALLOWED_TELEGRAM_USER } = require('../config');
const menu = require('./menu.js');
const actions = require('./actions.js');
const mexc = require('../libs/mexc.js');

async function main({ store }) {
	if (!process.env.BOT_TOKEN) throw new Error('"BOT_TOKEN" env var is missing!');

	// initialized the bot
	const bot = new Telegraf(process.env.BOT_TOKEN);

	// validate user
	bot.use((ctx, next) => {
		if (!ALLOWED_TELEGRAM_USER.includes(ctx.from.id)) {
			return ctx.reply('You dont have authorized access. Please contact with admin.');
		}
		next();
	});

	bot.start(async (ctx) => {
		ctx.replyWithHTML('<b>   🌎    Main Menu</b>', {
			reply_markup: menu('main'),
		});
	});

	// handle error globally.
	bot.catch((err, ctx) => {
		console.error(`Error for ${ctx.updateType}`, err);
		ctx.reply('Something went wrong');
	});

	// set all actions
	await actions({ bot, store, mexc });

	// lunch the bot
	bot.launch(() => console.log('=> Bot started...'));

	process.once('SIGINT', () => bot.stop('SIGINT'));
	process.once('SIGTERM', () => bot.stop('SIGTERM'));

	process.on('exit', (message) => {
		console.log(`=> Exit, status code: ${message}`);
		bot.stop();
	});

	process.on('uncaughtException', function (error) {
		console.log(error.stack);
		bot.stop();
	});

	return bot;
}

module.exports = main;
