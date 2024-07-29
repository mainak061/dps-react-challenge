import React from 'react';

const SearchBar = ({
	searchTerm,
	setSearchTerm,
	selectedCity,
	setSelectedCity,
	highlightOldest,
	setHighlightOldest,
	users,
}) => {
	const cities = [...new Set(users.map((user) => user.address.city))];

	return (
		<div>
			<input
				type="text"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder="Search by name"
			/>
			<select
				value={selectedCity}
				onChange={(e) => setSelectedCity(e.target.value)}
			>
				<option value="">Select city</option>
				{cities.map((city) => (
					<option key={city} value={city}>
						{city}
					</option>
				))}
			</select>
			<label>
				Highlight oldest per city
				<input
					type="checkbox"
					checked={highlightOldest}
					onChange={(e) => setHighlightOldest(e.target.checked)}
				/>
			</label>
		</div>
	);
};

export default SearchBar;
