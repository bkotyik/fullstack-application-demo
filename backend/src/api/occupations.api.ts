/// <reference path="../../tsd.d.ts" />
import {Router} from "express";
import {GetOccupationsMiddleware} from "../middlewares";
import {OccupationsDataSource} from "../data";

export default function OccupationsApi(deps?: any) {

    var router = Router();
    router.get("/", GetOccupationsMiddleware({occupationsDataSource: new OccupationsDataSource()}));

    return router;
}