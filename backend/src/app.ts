/// <reference path="../tsd.d.ts" />

import * as express from "express";
import * as bodyParser from "body-parser";
import { UsersApi, OccupationsApi} from "./api";
import {ErrorHandlerMiddleware} from "./middlewares";

var app = express();

app.use(bodyParser.json());
app.use("/users", UsersApi());
app.use("/occupations", OccupationsApi());

app.use(ErrorHandlerMiddleware());

app.listen(3000, function () {
    console.log("Application app listening on port 3000!");
});

export default app;