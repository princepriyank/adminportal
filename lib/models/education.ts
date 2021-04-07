import * as db from "./../api/db";

export default interface Education {
   id: string;
   email: string;
   user_id: string;
   certification: string;
   institution: string;
   passing_year: number;

}

const tableName = () => {
   return "education";
};

export const getQualification = async (id) => {
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

export const getEducationByUser = async (user_id) => {
   try {
      var params = {
         AttributesToGet: ["certification", "institution", "passing_year"],
         TableName: tableName(),
         Key: {
            "user_id": user_id,
         },
      };
      var results = await db.fetchDatafromDatabase2(params);
      var arr = [];
      for (let i = 0; i < results.length; i++) {
         arr.push(results[i])
      }
      return arr;
   } catch (err) {
      console.log(err);
      return;
   }
}