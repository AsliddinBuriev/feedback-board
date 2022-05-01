export default (rows) => {
	return rows.map((row) => {
		const parsed = {};
		for (let key in row) {
			const camelCase = key.replace(/([-_][a-z])/gi, ($1) =>
				$1.toUpperCase().replace('_', '')
			);
			parsed[camelCase] = row[key];
		}
		return parsed;
	});
};
