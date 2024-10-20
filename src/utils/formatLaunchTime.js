const formatDate = (timestamp) => {
	const date = new Date(timestamp);
	const day = String(date.getDate()).padStart(2, '0');
	const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const month = monthNames[date.getMonth()];
	const year = date.getFullYear();
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');

	return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

module.exports = formatDate;
