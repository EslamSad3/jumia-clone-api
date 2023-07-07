const mongoose = require("mongoose");
const dbConnection = ()=>{
mongoose
    .connect(process.env.DB_URL)
    .then((connect) => {
    console.log(`DB Connected : ${connect.connection.host}`);
    })
    .catch((err) => {
    console.log(`DB Error ${err}`);
    process.exit(1);
    });
}

module.exports = dbConnection