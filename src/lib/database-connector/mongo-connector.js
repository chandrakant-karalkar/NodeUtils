const MongoClient = require('mongodb').MongoClient;

let currentClient;
getConnection = async (url) => {
    let dbConnectionURL = url;
    return new Promise((resolve, reject) => {
        MongoClient.connect(dbConnectionURL, function (err, client) {
            if (err) {
                reject(err);
                return;
            }

            console.log("Connected successfully to db");
            currentClient = client;
            resolve(client);
        });
    });
};

closeConnection = () => {
    console.log("Closing Connection");
    currentClient && currentClient.close();
};

module.exports.getConnection = getConnection;
module.exports.closeConnection = closeConnection;
