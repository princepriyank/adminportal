import * as db from "./../api/db";

export default interface Curr_Responsibility {

   id: string;
   email: string;
   user_id: string;
   curr_responsibility: string;

}

const tableName = () => {
   return "curr_admin_responsibility";
};


export const getAdministration = async (id) => {
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

export const getResponsibilityByUser = async (user_id) => {
   try {
      var params = {
         AttributesToGet: ["curr_responsibility"],
         TableName: tableName(),
         Key: {
            "user_id": user_id,
         },
      };
      var results = await db.fetchDatafromDatabase2(params);
      var arr = [];
      for (let i = 0; i < results.length; i++) {
         arr.push(results[i].curr_responsibility)
      }
      return arr;
   } catch (err) {
      console.log(err);
      return;
   }
}