/// <reference path="../../tsd.d.ts" />
import {Router} from "express";
import AddUserMiddleware from "../middlewares/users/adduser.middleware";

export default function UsersApi(deps?: any) {

    var router = Router();
    router.post("/", AddUserMiddleware());

    return router;
}