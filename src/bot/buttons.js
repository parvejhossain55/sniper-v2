// all the commands(buttons with call_back_query) that needs to handle will put here
const defaultMenu = [
	{
		main: [
			['Scrape Token', 'scrape_token'],
			['Token List', 'token_list'],
			['Account Balances', 'account_balances'],
		],
		row: 2,
	},
	{
		primary: [
			[' ⚙️  Main Menu', 'main_menu'],
			['Hello World', 'hello_world'],
		],
		row: 2,
	},
];

module.exports = { defaultMenu };
