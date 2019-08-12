const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

//id,name,description,modifier
const csvWriter = createCsvWriter({
    path: 'final.csv',
    header: [
        {id: 'id', title: 'id'},
        {id: 'name', title: 'name'},
        {id: 'description', title: 'description'},
        {id: 'modifier', title: 'modifier'}
    ]
});

const fs = require('fs');
const dictionary = [];
const zipDB = [];
const MyData = [];

(async () => {
    fs.createReadStream('exported.csv')
        .pipe(csv())
        .on("data", (data) => {
            dictionary.push(data);
        })
        .on("end", () => {
            console.log("Parsed dictionary");
            fs.createReadStream('zipcode.csv')
                .pipe(csv())
                .on("data", (data) => {
                    zipDB.push(data);
                })
                .on("end", () => {
                    const result = dictionary.map((dv) => {
                        const dblocn = zipDB.find((db) => db.zip === dv.name);
                        if (dblocn) {
                            dv.description = dblocn.latitude + "," + dblocn.longitude;
                        }
                        return dv;
                    });
                    fs.writeFileSync("strDir.json", JSON.stringify(result, null, 2), {flag: 'w'});
                    // csvWriter.writeRecords(result).then(() => {
                    //     console.log("Done");
                    // });
                });
        });
})();