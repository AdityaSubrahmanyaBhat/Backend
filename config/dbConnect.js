const mongoose = require('mongoose');
const dbconfig = require('./dbConfig');

const startConnection = async () => {
    try {
        const connect = await mongoose.connect(dbconfig.database, { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true, });

        console.log(`Connected to database ${connect.connection.host} at Port = ${connect.connection.port}`);
    } catch (e) {
        console.log(`Error ${e}`);
    }
}

module.exports = startConnection;