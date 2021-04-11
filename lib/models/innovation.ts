import { query } from "../db";

export async function createInnovation(params) {
  await query(
    `insert into notices where (
		id=${params.id},
		title=${params.title},
		timestamp=${params.timestamp},
		openDate=${params.openDate},
		closeDate=${params.closeDate},
      description=${params.description},
      image=${params.image},
      author=${params.author},
		important=${params.important},
		email=${params.email},
      primary key(id))`
  )
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}

export async function updateInnovation(params) {
  await query(
    `update innovation where (
		id=${params.id},
		title=${params.title},
		timestamp=${params.timestamp},
		openDate=${params.openDate},
		closeDate=${params.closeDate},
    description=${params.description},
    image=${params.image},
    author=${params.author},
		important=${params.important},
	  email=${params.email},
      ) where id=${params.id}`
  )
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}

export async function deleteInnovation(id) {
  await query(`delete from innovation WHERE id = ${id}`)
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}
