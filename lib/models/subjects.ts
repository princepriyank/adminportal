import * as db from "./../api/db";

export default interface Subjects {
	id: string;
	email: string;
	user_id: string;
	subject: string;
}


const tableName = () => {
	return "subjects_teaching";
};


export const getSubjects = async (id) => {
	try {
		var params = {
			TableName: tableName(),
			Key: {
				"user_id": id,
			},
		};
		var result = await db.fetchDatafromDatabase2(params);

		return result;
	} catch (err) {
		console.log(err);
		return;
	}
}

export const getSubjectByUser = async (user_id) => {
	try {
		var params = {
			AttributesToGet: ["subject"],
			TableName: tableName(),
			Key: {
				"user_id": user_id,
			},
		};
		var results = await db.fetchDatafromDatabase2(params);
		var arr = [];
		for (let i = 0; i < results.length; i++) {
			arr.push(results[i].subject)
		}
		return arr;
	} catch (err) {
		console.log(err);
		return;
	}
}