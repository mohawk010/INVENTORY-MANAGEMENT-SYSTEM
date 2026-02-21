require("dotenv").config({

});
const { PUBLIC_DATA } = require("./constant");
const app = require("./src/app");
const { connectDB } = require("./src/config/db.config");
connectDB()



app.listen(PUBLIC_DATA.port, () => {
    console.log(`the app is listen at http://localhost:${PUBLIC_DATA.port}`);
})