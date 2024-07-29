import React from 'react';

const UserTable = ({ users, highlightOldest }) => {
	const getOldestUsersPerCity = (users) => {
		const oldestUsers = {};
		users.forEach((user) => {
			const city = user.city;
			if (
				!oldestUsers[city] ||
				new Date(user.birthDate) < new Date(oldestUsers[city].birthDate)
			) {
				oldestUsers[city] = user;
			}
		});
		return Object.values(oldestUsers);
	};

	const oldestUsers = getOldestUsersPerCity(users);

	return (
		<table>
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
							oldestUsers.includes(user) ? 'highlight' : ''
						}
					>
						<td>
							{user.firstName} {user.lastName}
						</td>
						<td>{user.address.city}</td>
						<td>{new Date(user.birthDate).toLocaleDateString()}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default UserTable;