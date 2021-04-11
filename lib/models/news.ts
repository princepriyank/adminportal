import { query } from "../db";

export async function createNews(params) {
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

export async function updateNews(params) {
  await query(
    `update news where (
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

export async function deleteNews(id) {
  await query(`delete from news WHERE id = ${id}`)
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}
