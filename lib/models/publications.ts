import * as db from "./../api/db";

export default interface Publications {
	user_id: string;
	email: string;
	publication_id: number;
	publications: string;
}


const tableName = () => {
	return "publications";
};


export const getFileData = async (id) => {
	try {
		var params = {
			TableName: tableName(),
			Key: {
				"user_id": id,
			},
		};
		var results = await db.fetchDatafromDatabase2(params);
		const fileData = results[0].publications
		return fileData;
	} catch (err) {
		console.log(err);
		return;
	}
}