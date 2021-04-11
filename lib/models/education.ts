import { query } from "../db";

export async function createEducation(params) {
  await query(
    `insert into education where (
		id=${params.id},
		user_id=${params.user_id},
		email=${params.email},
		certification=${params.certification},
		passing_year=${params.passing_year},
		primary key (id))`
  )
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}

export async function updateEducation(params) {
  await query(
    `update education where (
		certification=${params.certification},
		passing_year=${params.passing_year},
		) where id=${params.id}`
  )
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}

export async function deleteEducation(id) {
  await query(`delete from education WHERE id = ${id}`)
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}
