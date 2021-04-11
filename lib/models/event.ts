import { query } from "../db";

export async function createEvent(params) {
  await query(
    `insert into events where (
		id=${params.id},
		title=${params.title},
		timestamp=${params.timestamp},
		openDate=${params.openDate},
		closeDate=${params.closeDate},
      venue=${params.venue},
      doclink=${params.doclink}
		important=${params.important},
		attachments=${params.attachments},
		user_id=${params.user_id},
		primary key (id))`
  )
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}

export async function updateEvent(params) {
  await query(
    `update events set (
		title=${params.title},
		timestamp=${params.timestamp},
		openDate=${params.openDate},
		closeDate=${params.closeDate},
      venue=${params.venue},
      doclink=${params.doclink}
		important=${params.important},
		attachments=${params.attachments},
		user_id=${params.user_id},
		) where id=${params.id}`
  )
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}

export async function deleteEvent(id) {
  await query(`delete from events WHERE id = ${id}`)
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}
