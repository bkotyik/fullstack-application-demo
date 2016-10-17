/// <reference path="../tsd.d.ts" />

import * as express from "express";
import * as bodyParser from "body-parser";
import { UsersApi, OccupationsApi} from "./api";
import {ErrorHandlerMiddleware} from "./middlewares";
import * as cors from "cors";

// Bootstrap express application
var app = express();

// Turn on CORS to support client requests from foreign domains
app.use(cors({
    origin: ["http://localhost:8080"],
    methods: ["GET", "POST"]
}));
// Add json body parser to pipeline
app.use(bodyParser.json());
// attach users api to /users endpoint
app.use("/users", UsersApi());
// attach occupations api to /occupations endpoint
app.use("/occupations", OccupationsApi());
// last but not least add ErrorHandlerMiddleware. This should be added LAST!
app.use(ErrorHandlerMiddleware());

// start listening for requests
app.listen(3000, function () {
    console.log("Application app listening on port 3000!");
});

export default app;