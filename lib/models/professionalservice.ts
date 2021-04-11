import { query } from "../db";

export async function createProfessionalService(params) {
  await query(
    `insert into Professional_Service where (
		id=${params.id},
		user_id=${params.user_id},
		email=${params.email},
		services=${params.services},
		primary key (id)`
  )
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}

export async function updateProfessionalService(params) {
  await query(
    `update Professional_Service where (
		user_id=${params.user_id},
		email=${params.email},
		services=${params.services},
		) where publicaton_id=${params.id}`
  )
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}

export async function deleteProfessionalService(id) {
  await query(`delete from Professional_Service WHERE id = ${id}`)
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}
