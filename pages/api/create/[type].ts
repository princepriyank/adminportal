import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";
import { query } from "../../../lib/db";

const handler = async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    const { type } = req.query;
    try {
      const params = req.body;
      if (type == "notice") {
        await query(
          `insert into notices where (
            id=${params.id},
            title=${params.title},
            timestamp=${params.timestamp},
            openDate=${params.openDate},
            closeDate=${params.closeDate},
            important=${params.important},
            attachments=${params.attachments},
            email=${params.email},
            primary key (id))`
        );
      } else if (type == "event") {
        await query(
          `insert into events where (
            id=${params.id},
            title=${params.title},
            timestamp=${params.timestamp},
            openDate=${params.openDate},
            closeDate=${params.closeDate},
              venue=${params.venue},
              doclink=${params.doclink}
            important=${params.important},
            attachments=${params.attachments},
            email=${params.email},
            primary key (id))`
        );
      } else if (type == "innovation") {
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
        );
      } else if (type == "news") {
        await query(
          `insert into news where (
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
        );
      } else if (type == "user") {
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
        );
      } else if (type == "image") {
        await query(
          `insert into faculty_image where (
            user_id=${params.user_id},
            email=${params.email},
            image=${params.image},
            primary key (email))`
        );
      } else if (type == "current-responsibility") {
        await query(
          `insert into curr_admin_responsibility where (
                              id=${params.id},
                              user_id=${params.user_id},
                              email=${params.email},
                              curr_responsibility=${params.curr_responsibility},
                              primary key (id))`
        );
      } else if (type == "memberships") {
        await query(
          `insert into memberships where (
              id=${params.id},
              user_id=${params.user_id},
              email=${params.email},
              membership_id=${params.membership_id},
              membership_society=${params.membership_society},
              primary key (id))`
        );
      } else if (type == "past-responsibility") {
        await query(
          `insert into past_admin_responsibility where (
		id=${params.id},
		user_id=${params.user_id},
		email=${params.email},
		past_responsibility=${params.past_responsibility},
		primary key (id))`
        );
      } else if (type == "workexperience") {
        await query(
          `insert into work_experience where (
		id=${params.id},
		user_id=${params.user_id},
		email=${params.email},
		work_experiences=${params.work_experiences},
		primary key (id))`
        );
      } else if (type == "subjects") {
        await query(
          `insert into subjects_teaching where (
		id=${params.id},
		user_id=${params.user_id},
		email=${params.email},
		subject=${params.subject},
		primary key (id)`
        );
      } else if (type == "publications") {
        await query(
          `insert into publications where (
		publication_id=${params.id},
		user_id=${params.user_id},
		email=${params.email},
		publication_id=${params.publication_id},
		publications=${params.publications},
		primary key (publication_id),
		unique key (email))`
        );
      } else if (type == "project") {
        await query(
          `insert into project where (
		id=${params.id},
		user_id=${params.user_id},
      email=${params.email},
      project=${params.project},
		primary key (id))`
        );
      } else if (type == "professionalservice") {
        await query(
          `insert into Professional_Service where (
		id=${params.id},
		user_id=${params.user_id},
		email=${params.email},
		services=${params.services},
		primary key (id)`
        );
      } else if (type == "education") {
        await query(
          `insert into education where (
                  id=${params.id},
                  user_id=${params.user_id},
                  email=${params.email},
                  certification=${params.certification},
                  passing_year=${params.passing_year},
                  primary key (id))`
        );
      } else if (type == "phdcandidates") {
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
