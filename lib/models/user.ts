import { query } from "../db";

export async function createEducation(params) {
  await query(
    `insert into users where (
		id=${params.id},
		name=${params.name},
		email=${params.email},
		role=${params.role},
		department=${params.department},
		designation=${params.designation},
		ext_no=${params.ext_no},
		research_interest=${params.research_interest},
		primary key (id))`
  )
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}

export async function updateEducation(params) {
  await query(
    `update users where (
		name=${params.name},
		email=${params.email},
		role=${params.role},
		department=${params.department},
		designation=${params.designation},
		ext_no=${params.ext_no},
		research_interest=${params.research_interest},
		) where id=${params.id}`
  )
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}

export async function deleteEducation(id) {
  await query(`delete from users WHERE id = ${id}`)
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}
