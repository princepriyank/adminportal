import { query } from "../db";

export async function createPublication(params) {
  await query(
    `insert into publications where (
		id=${params.id},
		user_id=${params.user_id},
		email=${params.email},
		subject=${params.subject},
		primary key (id)`
  )
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}

export async function updatePublication(params) {
  await query(
    `update publications where (
		id=${params.id},
		user_id=${params.user_id},
		email=${params.email},
		subject=${params.subject},
		) where publicaton_id=${params.id}`
  )
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}

export async function deletePublication(id) {
  await query(`delete from publications WHERE id = ${id}`)
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}
