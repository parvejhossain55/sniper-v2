const { TOKEN_CHECK_INTERVAL_IN_MINUTE } = require('../config');

function checkUpcomingLaunchToken(data) {
	const currentTime = Date.now();
	const threeMinutesLater = currentTime + TOKEN_CHECK_INTERVAL_IN_MINUTE * 60000;

	const upcomingLaunches = data.filter((item) => {
		return item.launchTime >= currentTime && item.launchTime <= threeMinutesLater;
	});

	return upcomingLaunches;
}

module.exports = checkUpcomingLaunchToken;
