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