const cron = require('node-cron');
const checkLaunchToken = require('./checkUpcomingLaunchToken');

async function operations({ store, bot }) {
	// Schedule a task to run every 10 seconds
	cron.schedule('*/10 * * * * *', async () => {
		console.log('Running a task every 10 seconds');
		// Add your custom function logic here

		const upcomingLaunches = await checkLaunchToken(store.get('list'));
		if (!upcomingLaunches.length) return;

		// implemnt child proces and another part
		console.log('Upcoming', upcomingLaunches);
	});
}

module.exports = operations;
