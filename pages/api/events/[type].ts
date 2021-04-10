import { NextApiHandler } from "next";
import { query } from "../../../lib/db";

const handler: NextApiHandler = async (req, res) => {
  const { type } = req.query;

  try {
    let results;
    const now = new Date().getTime();
    if (type === "all") {
      results = await query(
        `
      SELECT * from events
    `
      );
    } else if (type == "active") {
      `
        SELECT * from events where openDate<${now} and closeDate>${now};
        `;
    }
    let array = JSON.parse(JSON.stringify(results));
    array.forEach((element) => {
      element.attachments = JSON.parse(element.attachments);
    });
    console.log(array);
    return res.json(array.reverse());
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
