const csv = require('csv-parser');
const fs = require('fs');
const mongoConnector = require('./lib/database-connector/mongo-connector');
const retailers = [];
const dbURL = "mongodb://localhost:27017";
const dbName = "wain";
(async () => {
    fs.createReadStream('data/retailers.csv')
        .pipe(csv())
        .on("data", (data) => {
            retailers.push({
                district: {
                    code: data.DIST_CODE,
                    name: data.DIST_NAME
                },
                retailer: {
                    name: data.RETAILER,
                    lapu_sim: data.LAPU_SIM,
                    category: data.RETAILER_CATEGORY,
                    bus: data.RETAILER_BUS,
                    type: data.RETAILER_TYPE
                },
                contact: {
                    name: data.CONTACT,
                    email: data.CONTACT_EMAIL,
                    phone: data.CONTACT_NUM
                },
                address: {
                    full_address: data.ADDRESS,
                    landmark: data.LANDMARK,
                    country: data.Country,
                    state: data.State,
                    district: data.DISTRICT,
                    village: data.VILLAGE,
                    tehsil: data.TEHSIL,
                    pincode: data.PINCODE
                },
                location: {
                    latitude: data.LATITUDE,
                    longitude: data.LONGITUDE
                },
                evd_flag : data.EVD_FLAG,
                gcmo: data.GCMO,
                product_type: data.PRODUCT_TYPE,
                signage_type: data.SIGNAGE_TYPE,
                sales: data.SALES
            });
        }).on("end", async () => {
        console.log(JSON.stringify(retailers));
        mongoConnector.getConnection(dbURL).then(async (dbClient) => {
            let db = await dbClient.db(dbName);
            db.collection("retailers").insert(retailers).then(() => {
                mongoConnector.closeConnection();
            });
        });
    });
})();
