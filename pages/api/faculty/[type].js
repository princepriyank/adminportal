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
        results = await query(
          `
      select * from users where id=${type}
    `
        );
      }
    let array = JSON.parse(JSON.stringify(results));
    console.log(array);
    return res.json(array.reverse());
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
