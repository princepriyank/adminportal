import * as db from "./../api/db";

export default interface PhdCandidates {
	id: string;
	user_id: string;
	email: string;
	phd_student_name: string;
	thesis_topic: string;
	start_year: string;
	completion_year: string;
}


const tableName = () => {
	return "Phd_Candidates";
};


export const getPhdCandidates = async (id) => {
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

export const getCandidatesByUser = async (user_id) => {
	try {
		var params = {
			AttributesToGet: ["phd_student_name", "thesis_topic", "start_year", "completion_year"],
			TableName: tableName(),
			Key: {
				"user_id": user_id,
			},
		};
		var results = await db.fetchDatafromDatabase2(params);
		var arr = [];
		for (let i = 0; i < results.length; i++) {
			arr.push(results[i])
		}
		return arr;
	} catch (err) {
		console.log(err);
		return;
	}
}