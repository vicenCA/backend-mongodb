const dotenv = require('dotenv');
dotenv.config();

const moongose = require('mongoose');

moongose.connect(process.env.MONGO_URL, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log("Database is running... ");
    }
})