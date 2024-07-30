import React, { useEffect, useState } from 'react';
import './SearchBar.css';

const SearchBar = ({
	searchTerm,
	setSearchTerm,
	selectedCity,
	setSelectedCity,
	highlightOldest,
	setHighlightOldest,
	users,
}) => {
	const [filteredUsers, setFilteredUsers] = useState(users);

	const getOldestUsersPerCity = (users) => {
		const oldestUsers = {};
		users.forEach((user) => {
			const city = user.address.city;
			if (
				!oldestUsers[city] ||
				new Date(user.birthDate) < new Date(oldestUsers[city].birthDate)
			) {
				oldestUsers[city] = user;
			}
		});
		return Object.values(oldestUsers);
	};

	const cities = [...new Set(users.map((user) => user.address.city))];
	const oldestUsers = getOldestUsersPerCity(users);

	useEffect(() => {
		let filtered = users;
		if (searchTerm) {
			filtered = filtered.filter((user) =>
				`${user.firstName} ${user.lastName}`
					.toLowerCase()
					.includes(searchTerm.toLowerCase())
			);
		}
		if (selectedCity) {
			filtered = filtered.filter(
				(user) => user.address.city === selectedCity
			);
		}
		setFilteredUsers(filtered);
	}, [searchTerm, selectedCity, users]);

	const UserTable = ({ users, highlightOldest }) => {
		return (
			<div className="table-container">
				<table className="user">
					<thead>
						<tr>
							<th>Name</th>
							<th>City</th>
							<th>Birthday</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr
								key={user.id}
								className={
									highlightOldest &&
									oldestUsers.includes(user)
										? 'highlight'
										: ''
								}
							>
								<td>
									{user.firstName} {user.lastName}
								</td>
								<td>{user.address.city}</td>
								<td>
									{new Date(
										user.birthDate
									).toLocaleDateString()}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	};

	return (
		<>
			<div className="searchBar">
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
			<UserTable
				users={filteredUsers}
				highlightOldest={highlightOldest}
			/>
		</>
	);
};

export default SearchBar;
