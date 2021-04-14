import { NextApiHandler } from "next";
import { query } from "../../../lib/db";

const handler = async (req, res) => {
  const { type } = req.query;
  try {
    const fdept = {
      arch: "Architecture",
      che: "Chemistry",
      ce: "Civil Engineering",
      cse: "Computer Science and Engineering",
      ee: "Electrical Engineering",
      ece: "Electronics and Communication Engineering",
      hss: "Humanities & Social Sciences",
      maths: "Mathematics",
      me: "Mechanical Engineering",
      phy: "Physics",
    };
    let results;

    if (type in fdept) {
      results = await query(
        `
      select * from users where department="${fdept[val]}"
    `
      );
    }
    else {
      results = {};
      let array = [
        "curr_admin_responsibility",
        "education",
        "memberships",
        "past_admin_responsibility",
        "phd_candidates",
        "professional_service",
        "project",
        "publications",
        "subjects_teaching",
        "work_experience",
      ];
      let data = await query(
        `SELECT * FROM users WHERE email="${type}";`
      ).catch((e) => {
        console.log(e);
      });
      let profile = JSON.parse(JSON.stringify(data))[0];
      results["profile"] = profile
      array.forEach(async (element) => {
        let data = await query(
          `SELECT * FROM ${element} WHERE user_id=${profile.id};`
        ).catch((e) => {
          console.log(e);
        });
        let tmp = JSON.parse(JSON.stringify(data))[0];
        results[element] = tmp;
      });
      }
    let array = JSON.parse(JSON.stringify(results));
    console.log(array);
    return res.json(array);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
