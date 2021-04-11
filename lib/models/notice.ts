import { query } from "../db";

export async function createNotice(params) {
  await query(
	  `insert into notices where (
		id=${params.id},
		title=${params.title},
		timestamp=${params.timestamp},
		openDate=${params.openDate},
		closeDate=${params.closeDate},
		important=${params.important},
		attachments=${params.attachments},
		userId=${params.userId})`
  ).then(res => {
	  return res
  }
  ).catch(e => console.log(e));
}

export async function updateNotice(params) {
	await query(
		`update notices set (
		id=${params.id},
		title=${params.title},
		timestamp=${params.timestamp},
		openDate=${params.openDate},
		closeDate=${params.closeDate},
		important=${params.important},
		attachments=${params.attachments},
		userId=${params.userId}
		) where id=${params.id}`
  );
}