// generateMenu.js
const { Markup } = require('telegraf');
const { defaultMenu } = require('./buttons');
const sliceButton = require('./sliceButton');

module.exports = function generateMenu(type) {
	const menu = [...defaultMenu];

	// Fallback menu with a "Main Menu" button if type not found
	const fallBack = {
		inline_keyboard: [[Markup.button.callback('↰ Main Menu', 'clear')]],
	};

	if (!type) {
		const primary = menu.find((menuItem) => menuItem.primary);
		if (primary) {
			return createInlineKeyboard(primary.primary, primary.row);
		}
	}

	const matched = menu.find((menuItem) => menuItem[type]);
	if (!matched) return fallBack;

	return createInlineKeyboard(matched[type], matched.row);
};

function createInlineKeyboard(buttons, rowSize) {
	const slicedButtons = sliceButton(buttons, rowSize);
	return {
		inline_keyboard: slicedButtons.map((row) => row.map(([name, action]) => Markup.button.callback(name, action))),
	};
}
