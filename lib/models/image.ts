import { query } from "../db";

export async function createFacultyImage(params) {
  await query(
    `insert into faculty_image where (
		user_id=${params.user_id},
		email=${params.email},
		image=${params.image},
		primary key (email))`
  )
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}

export async function updateFacultyImage(params) {
  await query(
    `update faculty_image where (
		image=${params.image},
		) where email=${params.email}`
  )
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}

export async function deleteFacultyImage(email) {
  await query(`delete from faculty_image WHERE email = ${email}`)
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}
