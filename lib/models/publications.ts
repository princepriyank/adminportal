import { query } from "../db";

export async function createPublication(params) {
  await query(
    `insert into publications where (
		publication_id=${params.id},
		user_id=${params.user_id},
		email=${params.email},
		publication_id=${params.publication_id},
		publications=${params.publications},
		primary key (publication_id),
		unique key (email))`
  )
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}

export async function updatePublication(params) {
  await query(
    `update publications where (
		publication_id=${params.id},
		user_id=${params.user_id},
		email=${params.email},
		publication_id=${params.publication_id},
		publications=${params.publications},
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
