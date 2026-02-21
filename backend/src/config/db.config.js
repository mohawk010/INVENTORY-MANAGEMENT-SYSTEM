const { default: mongoose } = require("mongoose");
const { PUBLIC_DATA } = require("../../constant");

exports.connectDB = async()=>{
  try {
       await mongoose.connect(PUBLIC_DATA.mongo_uri);
       console.log(`the app is connected with ${mongoose.connection.host}`);
  } catch (error) {
    console.error("DB Connection Error:", error.message);
    mongoose.disconnect();
    process.exit(1);
  }
};