
require('dotenv').config(); 

const mongoose = require('mongoose');

const dbURL = process.env.db_url;

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("DB Connected");
})
.catch(err => {
    console.log("Error in DB Connection", err);
});
