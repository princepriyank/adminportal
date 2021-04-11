import { query } from "../db";

export async function createPastResponsibility(params) {
  await query(
    `insert into past_admin_responsibility where (
		id=${params.id},
		user_id=${params.user_id},
		email=${params.email},
		past_responsibility=${params.past_responsibility},
		primary key (id))`
  )
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}

export async function updatePastResponsibility(params) {
  await query(
    `update past_admin_responsibility where (
		past_responsibility=${params.past_responsibility},
		) where id=${params.id}`
  )
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}

export async function deletePastResponsibility(id) {
  await query(`delete from past_admin_responsibility WHERE id = ${id}`)
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}
