export default interface Notice {

   id: string;
   title: string;
   timestamp: Date;
   openDate: Date;
   closeDate: Date;
   important: number;
   attachments: string;
   user_id: string;

}