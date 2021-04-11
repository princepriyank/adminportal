import { query } from "../db";

export async function createPhdCandidates(params) {
  await query(
    `insert into phd_candidates where (
		id=${params.id},
		user_id=${params.user_id},
		email=${params.email},
		phd_student_name=${params.phd_student_name},
		thesis_topic=${params.thesis_topic},
		start_year=${params.start_year},
		completion_year=${params.completion_year},
		primary key (publication_id))`
  )
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}

export async function updatePhdCandidates(params) {
  await query(
    `update phd_candidates where (
		user_id=${params.user_id},
		email=${params.email},
		phd_student_name=${params.phd_student_name},
		thesis_topic=${params.thesis_topic},
		start_year=${params.start_year},
		completion_year=${params.completion_year},
		) where publicaton_id=${params.id}`
  )
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}

export async function deletePhdCandidates(id) {
  await query(`delete from phd_candidates WHERE id = ${id}`)
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}
