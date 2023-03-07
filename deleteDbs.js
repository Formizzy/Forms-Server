import { environment } from "./config.js";
import mongoose from "mongoose";

// Build the connection string
const dbURI = `mongodb://${environment.user}:${encodeURIComponent(
    environment.password
)}@${environment.host}:${environment.dbPort}/test?authSource=admin&w=1`;

/// create a connection to the DB
var connection = mongoose.createConnection(dbURI);
connection.on("open", function () {
    // connection established
    let doNotremoveThisDbs = [
        "Project_form",
        "Submissions",
        "admin",
        "config",
        "local",
        "masterDB",
    ];

    new mongoose.mongo.Admin(connection.db).listDatabases(function (err, result) {
        console.log("listDatabases succeeded");
        // database list stored in result.databases
        var allDatabases = result.databases;
        let nameOfDatabase = JSON.parse(JSON.stringify(allDatabases)).map(
            async (db) => {
                if (!doNotremoveThisDbs.includes(db.name)) {
                    const dbConn = await connection.useDb(db.name, { useCache: true });
                    dbConn.dropDatabase(function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(dbConn.db.databaseName + " dropped");
                        }
                    });
                }
            }
        );




        console.log(nameOfDatabase);

    });
});