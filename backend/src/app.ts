/// <reference path="../tsd.d.ts" />

import * as express from "express";
import * as bodyParser from "body-parser";
import {UsersApi, OccupationsApi} from "./api";
import {ErrorHandlerMiddleware} from "./middlewares";
import * as cors from "cors";
import * as fs from "fs";

// Bootstrap express application
var app = express();
// Required path of the config file
var configFile = `${__dirname}/config.json`;
// Default configuration data
var config = {
    port: 3000,
    cors: {
        origin: [
            "http://localhost:8080"
        ],
        methods: [
            "GET",
            "POST"
        ]
    }
};

// Start app
main();

/**
 * Checks if the read configuration is valid
 * @param c configuration object
 * @returns {boolean} True if configuration object is valid. False if invalid.
 */
function isValidConfig(c: any) {
    var isCorsConfigOk = (cors: any) => cors != null && cors.origin != null && cors.methods != null && Array.isArray(cors.origin) && Array.isArray(cors.methods);
    var isPortConfigOk = (port: any) => port != null && !isNaN(port);

    return (c != null && isPortConfigOk(c.port) && isCorsConfigOk(c.cors));
}

/**
 * Reads configuration from external file if present, and validates it.
 */
function readConfig() {
    if (fs.existsSync(configFile)) {
        var content = fs.readFileSync(`${__dirname}/config.json`, "utf-8");
        try {
            let loadedConfig = JSON.parse(content);
            if (isValidConfig(loadedConfig)) {
                config = loadedConfig;
                console.log(`Loaded configuration from ${configFile}`);
            } else {
                console.log(`${configFile} contains invalid configuration data. Using default configuration`);
            }
        } catch (error) {
            console.log(`Config found at ${__dirname}/config.json but ${error}`);
        }
    }
}

function main() {
    readConfig();
    // Turn on CORS to support client requests from foreign domains
    app.use(cors(config.cors));
    // Add json body parser to pipeline
    app.use(bodyParser.json());
    // attach users api to /users endpoint
    app.use("/users", UsersApi());
    // attach occupations api to /occupations endpoint
    app.use("/occupations", OccupationsApi());
    // last but not least add ErrorHandlerMiddleware. This should be added LAST!
    app.use(ErrorHandlerMiddleware());

    // start listening for requests
    app.listen(config.port, function () {
        console.log(`Application app listening on port ${config.port}!`);
    });
}

export default app;