const mongoose = require("mongoose"); // obviously

const dbConection=()=>{
    mongoose
  .connect(process.env.DB_URI)
  .then((conn) => {
    console.log(`DataBase Connected :${conn.connection.host}`);
  })
  .catch((err) => {
    console.error(`Database Error :${err}`);
    process.exit(1);
  });
};
module.exports=dbConection;
