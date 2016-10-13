/// <reference path="../tsd.d.ts" />

import * as express from "express";

var app = express();

app.listen(3000, function () {
    console.log("Application app listening on port 3000!");
});
