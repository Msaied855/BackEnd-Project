const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
const dbConection=()=>{
    mongoose
  .connect(process.env.DB_URI)
  .then((conn) => {
    console.log(`DataBase Connected :${conn.connection.host}`);
 //    console.log(`fck ${typeof process.env.DB_URI} fck `);
  })
  /*
  .catch((err) => {
    console.error(`Database Error :${err}`);
    process.exit(1);
  });
  i will catch it in global in server.js
  */
};
module.exports=dbConection;
