import { query } from "../db";

export async function createMembership(params) {
  await query(
    `insert into memberships where (
		id=${params.id},
		user_id=${params.user_id},
      email=${params.email},
      membership_id=${params.membership_id},
      membership_society=${params.membership_society},
		primary key (id))`
  )
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}

export async function updateMembership(params) {
  await query(
    `update memberships where (
    membership_id=${params.membership_id},
    membership_society=${params.membership_society},
		) where id=${params.id}`
  )
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}

export async function deleteMembership(id) {
  await query(`delete from memberships WHERE id = ${id}`)
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}
