import * as db from "./../api/db";

export default interface Memberships {

   id: string;
   email: string;
   user_id: string;
   membership_id: string;
   membership_society: string;

}

const tableName = () => {
   return "memberships";
};

export const getMemberships = async (id) => {
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

export const getMembershipsByUser = async (user_id) => {
   try {
      var params = {
         AttributesToGet: ["membership_id", "membership_society"],
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
