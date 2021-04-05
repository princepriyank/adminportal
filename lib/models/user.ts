import * as db from "./../api/db";

export default interface User {
	id: string;
	name: string;
	email: string;
	role: number;
	department: string;
	designation: string;
	ext_no: number;
	research_interest: string;
}

const tableName = () => {
	return "users";
}

const ADMIN = () => {
	return 1;
}

const HOD = () => {
	return 2;
}

const FACULTY = () => {
	return 3;
}

export const findByID = async (id) => {
	try {
		var params = {
			TableName: tableName(),
			Key: {
				"id": id,
			},
		};
		var result = await db.fetchDatafromDatabase2(params);

		return result;
	} catch (err) {
		console.log(err);
		return;
	}
};

export const getUser = async (id) => {
	try {
		var params = {
			TableName: tableName(),
			Key: {
				"id": id,
			},
		};
		var results = await db.fetchDatafromDatabase2(params);
		if (results.length == 1) {
			return results[0];
		} else {
			return "No User or Duplicate Found"
		}

	} catch (err) {
		console.log(err);
		return;
	}
}


export const getUsersByDept = async (dept) => {
	try {
		var params = {
			TableName: tableName(),
			Key: {
				"department": dept,
			},
		};
		var results = await db.fetchDatafromDatabase2(params);
		if (results.length != 0) {
			return results;
		} else {
			return "No users found"
		}

	} catch (err) {
		console.log(err);
		return;
	}
}

export const create = async (user: User) => {
	try {
		// if (user.id) {
		// 	delete user.id;
		// }
		var result = await db.insertDataintoDatabase(tableName(), user);
		return result;
	} catch (err) {
		console.log(err);
		return;
	}
};

export const getAllUsers = async () => {
	try {
		var params = {
			TableName: tableName(),
		};
		var result = await db.fetchDatafromDatabase2(params);

		return result;
	} catch (err) {
		console.log(err);
		return;
	}
}

// parse function not implemented