import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";
import { updateEvent } from "../../../lib/models/event";
import { updateInnovation } from "../../../lib/models/innovation";
import { updateNews } from "../../../lib/models/news";
import { updateUser } from "../../../lib/models/user";
import { updateNotice } from "../../../lib/models/notice";
import { updateSubject } from "../../../lib/models/subjects";
import { updateCurrentResponsibility } from "../../../lib/models/current-responsibility";
import { updatePastResponsibility } from "../../../lib/models/past-responsibility";
import { updateWorkExperience } from "../../../lib/models/workexperience";
import { updatePublication } from "../../../lib/models/publications";
import { updateProject } from "../../../lib/models/project";
import { updateProfessionalService } from "../../../lib/models/professionalservice";
import { updateEducation } from "../../../lib/models/education";
import { updatePhdCandidates } from "../../../lib/models/phdcandidates";
import { updateFacultyImage } from "../../../lib/models/image";

const handler = async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    const { type } = req.query;
    try {
      const params = req.body;
      if (type == "notice") {
        updateNotice(params);
      } else if (type == "event") {
        updateEvent(params);
      } else if (type == "innovation") {
        updateInnovation(params);
      } else if (type == "news") {
        updateNews(params);
      } else if (type == "user") {
        updateUser(params);
      } else if (type == "image") {
        updateFacultyImage(params);
      } else if (type == "current-responsibility") {
        updateCurrentResponsibility(params);
      } else if (type == "past-responsibility") {
        updatePastResponsibility(params);
      } else if (type == "workexperience") {
        updateWorkExperience(params);
      } else if (type == "subjects") {
        updateSubject(params);
      } else if (type == "publications") {
        updatePublication(params);
      } else if (type == "project") {
        updateProject(params);
      } else if (type == "professionalservice") {
        updateProfessionalService(params);
      } else if (type == "education") {
        updateEducation(params);
      } else if (type == "phdcandidates") {
        updatePhdCandidates(params);
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
