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
		email=${params.email},
		primary key (id))`
  ).then(res => {
	  return res
  }
  ).catch(e => console.log(e));
}

export async function updateNotice(params) {
	await query(
    `update notices set (
		title=${params.title},
		timestamp=${params.timestamp},
		openDate=${params.openDate},
		closeDate=${params.closeDate},
		important=${params.important},
		attachments=${params.attachments},
		email=${params.email}
		) where id=${params.id}`
  )
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));;
}

export async function deleteNotice(id) {
	await query(`delete from notices WHERE id = ${id}`)
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}