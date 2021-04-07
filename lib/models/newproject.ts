import * as db from "./../api/db";

export default interface Project {
   id: string;
   user_id: string;
   email: string;
   project: string;
}

const tableName = () => {
   return "Project";
};


export const getProjects = async (id) => {
   try {
      var params = {
         TableName: tableName(),
         Key: {
            "user_id": id,
         },
      };
      var result = await db.fetchDatafromDatabase2(params);

      return result;
   } catch (err) {
      console.log(err);
      return;
   }

}

export const getProjectsByUser = async (user_id) => {
   try {
      var params = {
         AttributesToGet: ["project"],
         TableName: tableName(),
         Key: {
            "user_id": user_id,
         },
      };
      var results = await db.fetchDatafromDatabase2(params);
      var arr = [];
      for (let i = 0; i < results.length; i++) {
         arr.push(results[i].project)
      }
      return arr;
   } catch (err) {
      console.log(err);
      return;
   }
}
