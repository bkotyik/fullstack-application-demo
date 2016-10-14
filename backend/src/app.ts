/// <reference path="../tsd.d.ts" />

import * as express from "express";
import UsersApi from "./api/users.api";
import * as bodyParser from "body-parser";

var app = express();

app.use(bodyParser.json());
app.use("/users", UsersApi());

app.listen(3000, function () {
    console.log("Application app listening on port 3000!");
});
