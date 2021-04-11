import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";
import { deleteEvent } from "../../../lib/models/event";
import { deleteInnovation } from "../../../lib/models/innovation";
import { deleteNews } from "../../../lib/models/news";
import { deleteUser } from "../../../lib/models/user";
import { deleteNotice } from "../../../lib/models/notice";
import { deleteSubject } from "../../../lib/models/subjects";
import { deleteCurrentResponsibility } from "../../../lib/models/current-responsibility";
import { deletePastResponsibility } from "../../../lib/models/past-responsibility";
import { deleteWorkExperience } from "../../../lib/models/workexperience";
import { deletePublication } from "../../../lib/models/publications";
import { deleteProject } from "../../../lib/models/project";
import { deleteProfessionalService } from "../../../lib/models/professionalservice";
import { deleteEducation } from "../../../lib/models/education";
import { deletePhdCandidates } from "../../../lib/models/phdcandidates";
import { deleteFacultyImage } from "../../../lib/models/image";

const handler = async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    const { type } = req.query;
    try {
      const params = req.body;
      if (type == "notice") {
        deleteNotice(params);
      } else if (type == "event") {
        deleteEvent(params);
      } else if (type == "innovation") {
        deleteInnovation(params);
      } else if (type == "news") {
        deleteNews(params);
      } else if (type == "user") {
        deleteUser(params);
      } else if (type == "image") {
        deleteFacultyImage(params);
      } else if (type == "current-responsibility") {
        deleteCurrentResponsibility(params);
      } else if (type == "past-responsibility") {
        deletePastResponsibility(params);
      } else if (type == "workexperience") {
        deleteWorkExperience(params);
      } else if (type == "subjects") {
        deleteSubject(params);
      } else if (type == "publications") {
        deletePublication(params);
      } else if (type == "project") {
        deleteProject(params);
      } else if (type == "professionalservice") {
        deleteProfessionalService(params);
      } else if (type == "education") {
        deleteEducation(params);
      } else if (type == "phdcandidates") {
        deletePhdCandidates(params);
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
