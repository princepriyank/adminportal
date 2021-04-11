import { query } from "../db";

export async function createProject(params) {
  await query(
    `insert into project where (
		id=${params.id},
		user_id=${params.user_id},
      email=${params.email},
      project=${params.project},
		primary key (id))`
  )
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}

export async function updateProject(params) {
  await query(
    `update project where (
		id=${params.id},
		user_id=${params.user_id},
      email=${params.email},
      project=${params.project},
		) where id=${params.id}`
  )
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}

export async function deleteProject(id) {
  await query(`delete from project WHERE id = ${id}`)
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}
