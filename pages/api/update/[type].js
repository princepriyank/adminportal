import { NextApiHandler } from "next";
import { query } from "../../../lib/db";
import { getSession } from "next-auth/client";

const handler = async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    const { type } = req.query;
    try {
      const params = req.body;
      if (type == "notice") {
        await query(
          `update notices set (
		title=${params.title},
		timestamp=${params.timestamp},
		openDate=${params.openDate},
		closeDate=${params.closeDate},
		important=${params.important},
		attachments=${params.attachments},
		email=${params.email}
		) where id=${params.id}`
        );
      } else if (type == "event") {
        await query(
          `update events set (
		title=${params.title},
		timestamp=${params.timestamp},
		openDate=${params.openDate},
		closeDate=${params.closeDate},
      venue=${params.venue},
      doclink=${params.doclink}
		important=${params.important},
		attachments=${params.attachments},
		email=${params.email},
		) where id=${params.id}`
        );
      } else if (type == "innovation") {
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
        );
      } else if (type == "news") {
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
        );
      } else if (type == "user") {
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
        );
      } else if (type == "memberships") {
        await query(
          `update memberships where (
    membership_id=${params.membership_id},
    membership_society=${params.membership_society},
		) where id=${params.id}`
        );
      } else if (type == "image") {
        await query(
          `update faculty_image where (
		image=${params.image},
		) where email=${params.email}`
        );
      } else if (type == "current-responsibility") {
        await query(
          `update curr_admin_responsibility where (
		curr_responsibility=${params.curr_responsibility},
		) where id=${params.id}`
        );
      } else if (type == "past-responsibility") {
        await query(
          `update past_admin_responsibility where (
		past_responsibility=${params.past_responsibility},
		) where id=${params.id}`
        );
      } else if (type == "workexperience") {
        await query(
          `update work_experience where (
		work_experiences=${params.work_experiences},
		) where id=${params.id}`
        );
      } else if (type == "subjects") {
        await query(
          `update subjects_teaching where (
		id=${params.id},
		user_id=${params.user_id},
		email=${params.email},
		subject=${params.subject},
		) where publicaton_id=${params.id}`
        );
      } else if (type == "publications") {
        await query(
          `update publications where (
		publication_id=${params.id},
		user_id=${params.user_id},
		email=${params.email},
		publication_id=${params.publication_id},
		publications=${params.publications},
		) where publicaton_id=${params.id}`
        );
      } else if (type == "project") {
        await query(
          `update project where (
		id=${params.id},
		user_id=${params.user_id},
      email=${params.email},
      project=${params.project},
		) where id=${params.id}`
        );
      } else if (type == "professionalservice") {
        await query(
          `update Professional_Service where (
		user_id=${params.user_id},
		email=${params.email},
		services=${params.services},
		) where publicaton_id=${params.id}`
        );
      } else if (type == "education") {
        await query(
          `update education where (
		certification=${params.certification},
		passing_year=${params.passing_year},
		) where id=${params.id}`
        );
      } else if (type == "phdcandidates") {
        await query(
          `update phd_candidates where (
		user_id=${params.user_id},
		email=${params.email},
		phd_student_name=${params.phd_student_name},
		thesis_topic=${params.thesis_topic},
		start_year=${params.start_year},
		completion_year=${params.completion_year},
		) where publicaton_id=${params.id}`
        );
      } else {
        res.json({ message: "Could not find matching requests" });
      }
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  } else {
    res.status(403).json({ message: "You are not authorized" });
  }
};

export default handler;
