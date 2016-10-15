/// <reference path="../tsd.d.ts" />

import * as express from "express";
import * as bodyParser from "body-parser";
import UsersApi from "./api/users.api";
import OccupationsApi from "./api/occupations.api";
import ErrorHandlerMiddleware from "./middlewares/shared/ErrorHandlerMiddleware";

var app = express();

app.use(bodyParser.json());
app.use("/users", UsersApi());
app.use("/occupations", OccupationsApi());

app.use(ErrorHandlerMiddleware());

app.listen(3000, function () {
    console.log("Application app listening on port 3000!");
});
