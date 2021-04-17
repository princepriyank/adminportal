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
        
        let result = await query(`DELETE from notices WHERE id = ${params}`);
      res.json(result)
      } else if (type == "event") {
        console.log(params);
        
        let result = await query(`DELETE from events WHERE id = ${params}`);
      res.json(result)
      } else if (type == "innovation") {
        
        let result = await query(`delete from innovation WHERE id = ${params}`);
      res.json(result)
      } else if (type == "news") {
        
        let result = await query(`delete from news WHERE id = ${params}`);
      res.json(result)
      } else if (type == "user") {
        await query(`delete from users WHERE id = ${params}`);
      } else if (type == "memberships") {
        await query(`delete from memberships WHERE id = ${params}`);
      } else if (type == "image") {
        await query(`delete from faculty_image WHERE email = "${params}"`);
      } else if (type == "current-responsibility") {
        await query(
          `delete from curr_admin_responsibility WHERE id = ${params}`
        );
      } else if (type == "past-responsibility") {
        await query(
          `delete from past_admin_responsibility WHERE id = ${params}`
        );
      } else if (type == "workexperience") {
        await query(`delete from work_experience WHERE id = ${params}`);
      } else if (type == "subjects") {
        await query(`delete from subjects_teaching WHERE id = ${params}`);
      } else if (type == "publications") {
        await query(`delete from publications WHERE id = ${params}`);
      } else if (type == "project") {
        await query(`delete from project WHERE id = ${params}`);
      } else if (type == "professionalservice") {
        await query(`delete from Professional_Service WHERE id = ${params}`);
      } else if (type == "education") {
        await query(`delete from education WHERE id = ${params}`);
      } else if (type == "phdcandidates") {
        await query(`delete from phd_candidates WHERE id = ${params}`);
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
