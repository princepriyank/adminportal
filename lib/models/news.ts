import * as db from "./../api/db";

export default interface News {
   id: string;
   title: string;
   timestamp: Date;
   openDate: Date;
   closeDate: Date;
   venue: string;
   description: string;
   attachments: string;
   user_id: string;
}


const tableName = () => {
   return "news";
};

export const create = async (news: News) => {
   try {
      news.attachments = JSON.stringify(news.attachments)
      var result = await db.insertDataintoDatabase(tableName(), news);
      return result;
   } catch (err) {
      console.log(err);
      return;
   }
};

export const findByUserID = async (user_id) => {
   try {
      var params = {
         TableName: tableName(),
         Key: {
            "user_id": user_id,
         },
      };
      var result = await db.fetchDatafromDatabase2(params);
      result.attachments = JSON.parse(result.attachments)
      return result;
   } catch (err) {
      console.log(err);
      return;
   }
};

export const findByID = async (id) => {
   try {
      var params = {
         TableName: tableName(),
         Key: {
            "id": id,
         },
      };
      var result = await db.fetchDatafromDatabase2(params);
      result.attachments = JSON.parse(result.attachments)
      return result;
   } catch (err) {
      console.log(err);
      return;
   }
};

export const updateData = async (id, key, value) => {
   var params = {
      Tablename: tableName(),
      Key: {
         "id": id
      },
      UpdateExpression: `set ${key} = :r`,
      ExpressionAttributeValues: {
         ":r": value
      },
      ReturnValues: "UPDATED_NEW"
   }

   var result = await db.updateDatafromDatabase(params);
   return result;
}

export const updateWholeObj = async (id, news: News) => {

   var result = await db.insertDataintoDatabase(tableName(), news);

   return result;

}

export const toggleVisibility = async (id, visible_status) => {
   try {
      var params = {
         AttributesToGet: ['closeDate', 'timestamp'],
         TableName: tableName(),
         Key: {
            "id": id,
         },
      };
      var news = await db.fetchDatafromDatabase2(params);

      if (visible_status == 1) {
         updateData(id, "closeDate", new Date().getTime() + (86400000 * 5));

      }
      else {
         updateData(id, "closeDate", news[0].timestamp);

      }
   } catch (error) {
      console.log(error);
      return;

   }
}

export const toggleImportance = async (id, value) => {

   const result = await updateData(id, "important", value)
   return result;
}

export const deleteRow = async (id) => {
   var params = {
      TableName: tableName(),
      Key: {
         "id": id
      }
   }
   try {
      var result = await db.deleteDatafromDatabase(params);
      return result;
   } catch (err) {
      console.log(err);
      return;

   }
}

export const getActiveNews = async () => {
   try {
      const now = new Date().getTime();

      var params = {
         TableName: tableName(),
         FilterExpression: "openDate<:curr AND closeDate >:curr",
         ExpressionAttributeValues: { ":curr": now }
      }

      var active_news = await db.fetchDatafromDatabase1(params);
      active_news.forEach(news => {
         news.attachments = JSON.parse(news.attachments)
      })
      return active_news;

   } catch (err) {
      console.log(err);
      return;
   }
}

export const getArchivedNews = async () => {
   try {
      const now = new Date().getTime();

      var params = {
         TableName: tableName(),
         FilterExpression: "closeDate <:curr",
         ExpressionAttributeValues: { ":curr": now }
      }

      var active_news = await db.fetchDatafromDatabase1(params);
      active_news.forEach(news => {
         news.attachments = JSON.parse(news.attachments)
      })
      return active_news;

   } catch (err) {
      console.log(err);
      return;
   }
}