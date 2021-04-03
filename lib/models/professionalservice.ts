import * as db from "./../api/db";

export default interface Professional_Service {
	id: string;
	user_id: string;
	email: string;
	services: string;
}


const tableName = () => {
	return "Professional_Service";
};


export const getProfessionalService = async (id) => {
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
			AttributesToGet: ["services"],
			TableName: tableName(),
			Key: {
				"user_id": user_id,
			},
		};
		var results = await db.fetchDatafromDatabase2(params);
		var arr = [];
		for (let i = 0; i < results.length; i++) {
			arr.push(results[i].services)
		}
		return arr;
	} catch (err) {
		console.log(err);
		return;
	}
}