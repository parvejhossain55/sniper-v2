const scrapeNewestTokens = require('../scrapper/index.js');
const formatDate = require('../utils/formatLaunchTime.js');
const menu = require('./menu.js');

module.exports = async function ({ bot, store, mexc }) {
	bot.action('main_menu', (ctx) => ctx.replyWithHTML('<b>Main Menu</b>', { reply_markup: menu('main') }));

	// scrape token
	bot.action('scrape_token', async (ctx) => {
		const tokens = await scrapeNewestTokens();
		console.log(tokens);

		if (!tokens?.length) return ctx.reply('Token not available for sniping.');
		store.add('list', tokens);

		let msg = 'New Tokens found for Sniping!\n\n';
		for (const token of tokens) {
			msg += `Token Name : ${token.symbol}\nLaunch Time : ${formatDate(token.launchTime)}\n\n`;
		}

		return ctx.replyWithHTML(msg, { reply_markup: menu('main') });
	});

	// show token list
	bot.action('token_list', (ctx) => {
		const tokens = store.get('list');
		if (!tokens.length) return ctx.reply('Token not found in sniping list.');

		let msg = 'Tokens list for Sniping!\n\n';
		for (const token of tokens) {
			msg += `Token Name : ${token.symbol}\nLaunch Time : ${formatDate(token.launchTime)}\n\n`;
		}

		return ctx.replyWithHTML(msg, { reply_markup: menu('main') });
	});

	bot.action('account_balances', async (ctx) => {
		const balances = await mexc.getBalances();
		const message = formatBalanceMessage(balances);
		ctx.replyWithHTML(message, { reply_markup: menu('main') });
	});
};

function formatBalanceMessage(balances) {
	// Assuming the response contains an array of assets and balances
	let message = '💰 *Current Balances:*\n\n';
	balances.forEach((balance) => {
		const asset = balance.asset;
		const freeBalance = parseFloat(balance.free).toFixed(4); // Limiting to 4 decimal places
		const lockedBalance = parseFloat(balance.locked).toFixed(4); // Limiting to 4 decimal places

		message += `*Asset:* ${asset}\n`;
		message += `- Available: ${freeBalance}\n`;
		message += `- Locked: ${lockedBalance}\n\n`;
	});

	return message;
}
