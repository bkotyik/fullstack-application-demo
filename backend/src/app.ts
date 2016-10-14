/// <reference path="../tsd.d.ts" />

import * as express from "express";
import UsersApi from "./api/users.api";
import * as bodyParser from "body-parser";
import ErrorHandlerMiddleware from "./middlewares/ErrorHandlerMIddleware";

var app = express();

app.use(bodyParser.json());
app.use("/users", UsersApi());

app.use(ErrorHandlerMiddleware());

app.listen(3000, function () {
    console.log("Application app listening on port 3000!");
});
