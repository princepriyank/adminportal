import * as db from "./../api/db";

export default interface Workexpreience {
	id: string;
	usre_id: string;
	email: string;
	work_experiences: string;
}


const tableName = () => {
	return "Work_Experience";
};


export const getWorkExperience = async (id) => {
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

export const getWorkExperienceByUser = async (user_id) => {
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
			arr.push(results[i].work_experiences)
		}
		return arr;
	} catch (err) {
		console.log(err);
		return;
	}
}