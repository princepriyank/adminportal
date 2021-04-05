export default interface Image {

   user_id: string;
   name: string;
   email: string;
   image: string;

}

const tableName = () => {
   return 'images';
}