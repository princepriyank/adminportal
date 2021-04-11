import { query } from "../db";

export async function createWorkExperience(params) {
  await query(
    `insert into work_experience where (
		id=${params.id},
		user_id=${params.user_id},
		email=${params.email},
		work_experiences=${params.work_experiences},
		primary key (id))`
  )
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}

export async function updateWorkExperience(params) {
  await query(
    `update work_experience where (
		work_experiences=${params.work_experiences},
		) where id=${params.id}`
  )
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}

export async function deleteWorkExperience(id) {
  await query(`delete from work_experience WHERE id = ${id}`)
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}
