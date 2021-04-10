import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler = async (req, res) => {
    const {type}=req.query
  try {
      if (type[0] == "create") {
          const results = await query(
              `
      INSERT INTO entries (title, content)
      VALUES (?, ?)
      `,
              [filter.clean(title), filter.clean(content)]
          )
      }
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
