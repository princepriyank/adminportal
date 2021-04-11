import { query } from "../db";

export async function createSubject(params) {
  await query(
    `insert into subjects_teaching where (
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

export async function updateSubject(params) {
  await query(
    `update subjects_teaching where (
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

export async function deleteSubject(id) {
  await query(`delete from subjects_teaching WHERE id = ${id}`)
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}
