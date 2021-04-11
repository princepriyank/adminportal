import { query } from "../db";

export async function createCurrentResponsibility(params) {
  await query(
    `insert into curr_admin_responsibility where (
		id=${params.id},
		user_id=${params.user_id},
		email=${params.email},
		curr_responsibility=${params.curr_responsibility},
		primary key (id))`
  )
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}

export async function updateCurrentResponsibility(params) {
  await query(
    `update curr_admin_responsibility where (
		curr_responsibility=${params.curr_responsibility},
		) where id=${params.id}`
  )
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}

export async function deleteCurrentResponsibility(id) {
  await query(`delete from curr_admin_responsibility WHERE id = ${id}`)
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}
