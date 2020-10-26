const mongoose = require("mongoose");

mongoose
  .connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(db => console.log("DB Conected"))
  .catch(err => console.log(err));

module.exports = mongoose;
