/// <reference path="../../tsd.d.ts" />
import {Router} from "express";
import {AddUserMiddleware, GetUserMetadata} from "../middlewares";

export default function UsersApi(deps?: any) {

    var router = Router();
    router.post("/", AddUserMiddleware());
    router.get("/metadata", GetUserMetadata());

    return router;
}