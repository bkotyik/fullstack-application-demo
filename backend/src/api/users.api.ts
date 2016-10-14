/// <reference path="../../tsd.d.ts" />
import {Router} from "express";
import AddUserMiddleware from "../middlewares/AddUserMiddleware";

export default function UsersApi(deps?: any) {

    var router = Router();
    router.post("/", AddUserMiddleware());
    // TODO: Add endpoint declarations

    return router;
}