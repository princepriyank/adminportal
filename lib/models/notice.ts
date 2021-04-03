import * as db from "./../api/db";

export default interface Notice {
	id: string;
	title: string;
	timestamp: Date;
	openDate: Date;
	closeDate: Date;
	important: number;
	attachments: string;
	user_id: string;
}

export const tableName = () => {
	return "notices";
};

export const create = async (notice: Notice) => {
	notice.attachments = JSON.stringify(notice.attachments)
	var result = await db.insertDataintoDatabase(tableName(), notice);
	return result;
};

export const findByUserID = async (user_id) => {
	var params = {
		TableName: tableName(),
		key: {
			"user_id": user_id,
		},
	};
	var result = await db.fetchDatafromDatabase2(params);
	return result;
};

export const findByID = async (id) => {
	var params = {
		TableName: tableName(),
		key: {
			"id": id,
		},
	};
	var result = await db.fetchDatafromDatabase2(params);
	result.attachments = JSON.parse(result.attachments)
	return result;
};

export const updateData = async (id, key, value) => {
	var params = {
		Tablename: tableName(),
		key: {
			"id": id
		},
		UpdateExpression: `set ${key} = :r`,
		ExpressionAttributeValues: {
			":r": value
		},
		ReturnValues: "UPDATED_NEW"
	}

	var result = await db.updateDatafromDatabase(params);
	return result;
}

export const updateWholeObj = async (id, notice: Notice) => {

	var result = await db.insertDataintoDatabase(tableName(), notice);

	return result;

}

export const toggleVisibility = async (id, visible_status) => {
	try {
		var notice = await findByID(id);
		if (visible_status == 1) {
			updateData(id, "closeDate", new Date().getTime() + (86400000 * 5));

		}
		else {
			updateData(id, "closeDate", notice[0].timestamp);

		}
	} catch (error) {
		console.log(error);
		return;

	}
}

export const toggleImportance = async (id, value) => {

	const result = await updateData(id, "important", value)
	return result;
}

export const deleteRow = async (id) => {
	var params = {
		TableName: tableName(),
		key: {
			"id": id
		}
	}
	try {
		var result = await db.deleteDatafromDatabase(params);
		return result;
	} catch (err) {
		console.log(err);
		return;

	}
}

export const getActiveNotices = async () => {
	try {
		const now = new Date().getTime();

		var params = {
			TableName: tableName(),
			FilterExpression: "openDate<:curr AND closeDate >:curr",
			ExpressionAttributeValues: { ":curr": now }
		}

		var active_notices = await db.fetchDatafromDatabase1(params);
		return active_notices;

	} catch (err) {
		console.log(err);
		return;
	}
}

export const getArchivedNotices = async () => {
	try {
		const now = new Date().getTime();

		var params = {
			TableName: tableName(),
			FilterExpression: "closeDate <:curr",
			ExpressionAttributeValues: { ":curr": now }
		}

		var active_notices = await db.fetchDatafromDatabase1(params);
		active_notices.forEach(notice => {
			notice.attachments = JSON.parse(notice.attachments)
		})
		return active_notices;

	} catch (err) {
		console.log(err);
		return;
	}
}