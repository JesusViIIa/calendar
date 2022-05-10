const mongoose = require('mongoose');


const dbConnect = async() => {
    const URI = process.env.URI

    try {
        const db = await mongoose.connect(URI);
        console.log(db.connection.name);


    } catch (error) {
        throw error

    }

}
module.exports = dbConnect