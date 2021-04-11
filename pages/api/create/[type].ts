import { NextApiHandler } from 'next'
import { getSession } from "next-auth/client";
import { query } from '../../../lib/db'
import { createEvent } from '../../../lib/models/event'
import { createInnovation } from '../../../lib/models/innovation'
import { createNews } from "../../../lib/models/news";
import { createUser } from "../../../lib/models/user";
import { createNotice } from '../../../lib/models/notice'
import { createSubject } from "../../../lib/models/subjects";
import { createCurrentResponsibility } from '../../../lib/models/current-responsibility';
import { createPastResponsibility } from '../../../lib/models/past-responsibility';
import { createWorkExperience } from '../../../lib/models/workexperience';
import { createPublication } from '../../../lib/models/publications';
import { createProject } from '../../../lib/models/project';
import { createProfessionalService } from '../../../lib/models/professionalservice';
import { createEducation } from '../../../lib/models/education';
import { createPhdCandidates } from '../../../lib/models/phdcandidates';
import { createFacultyImage } from '../../../lib/models/image';

const handler = async (req, res) => {
    const session = await getSession({ req });

  if (session) {
    const { type } = req.query
    try {
      const params = req.body;
      if (type == "notice") {
        createNotice(params);
      }
      else if (type == "event") {
        createEvent(params);
      }
      else if (type == "innovation") {
        createInnovation(params);
      }
      else if (type == "news") {
        createNews(params);
      }
      else if (type == "user") {
        createUser(params);
      }
      else if (type == "image") {
        createFacultyImage(params);
      }
      else if (type == "current-responsibility") {
        createCurrentResponsibility(params);
      }
      else if (type == "past-responsibility") {
        createPastResponsibility(params);
      }
      else if (type == "workexperience") {
        createWorkExperience(params);
      }
      else if (type == "subjects") {
        createSubject(params);
      }
      else if (type == "publications") {
        createPublication(params);
      }
      else if (type == "project") {
        createProject(params);
      }
      else if (type == "professionalservice") {
        createProfessionalService(params);
      }
      else if (type == "education") {
        createEducation(params);
      }
      else if (type == "phdcandidates") {
        createPhdCandidates(params);
      }
      else {
        res.json({message:"Could not find matching requests"})
      }
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  } else {
    res.status(403).json({message:"You are not authorized"})
  }
}

export default handler
