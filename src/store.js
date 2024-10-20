class StoreManagement {
	constructor() {
		this.data = new Map();
		this.add('list', [
			{ symbol: 'KOISUI', launchTime: 1729449078084 },
			{ symbol: 'SGPT', launchTime: 1729508400000 },
			{ symbol: 'POWERAI', launchTime: 1729512000000 },
			{ symbol: 'GOGLZ', launchTime: 1729515600000 },
		]);
		this.add('monitor', []);
	}

	// Add or update data in the store
	add(key, item) {
		this.data.set(key, item);
	}

	// Get data by key
	get(key) {
		if (this.data.has(key)) {
			return this.data.get(key);
		}
		console.log(`Item with key ${key} not found.`);
		return null;
	}

	// Update an existing key's value
	update(key, value) {
		if (this.data.has(key)) {
			const prevData = this.data.get(key);
			// If previous data is an object, merge it with the new value
			if (typeof prevData === 'object' && !Array.isArray(prevData)) {
				this.data.set(key, { ...prevData, ...value });
			} else {
				this.data.set(key, value); // Replace if not an object
			}
		} else {
			console.log(`Item with key ${key} not found.`);
		}
	}

	// Remove data by key
	remove(key) {
		if (this.data.delete(key)) {
			console.log(`Item with key ${key} removed.`);
		} else {
			console.log(`Item with key ${key} not found.`);
		}
	}

	// Display all items in the store
	display() {
		if (this.data.size === 0) {
			console.log('The store is empty.');
			return;
		}

		console.log('Items in the store:');
		this.data.forEach((item, key) => {
			console.log(`Key: ${key}, Value: ${JSON.stringify(item)}`);
		});
	}
}

const store = new StoreManagement();
module.exports = store;
