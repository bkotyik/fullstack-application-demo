/// <reference path="../../tsd.d.ts" />
import {Router} from "express";
import GetOccupationsMiddleware from "../middlewares/occupations/GetOccupationsMiddleware";

export default function OccupationsApi(deps?: any) {

    var router = Router();
    router.get("/", GetOccupationsMiddleware());

    return router;
}