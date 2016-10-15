/// <reference path="../../tsd.d.ts" />
import {Router} from "express";
import GetOccupationsMiddleware from "../middlewares/occupations/getoccupations.middleware";
import OccupationsDataSource from "../data/occupations.datasource";

export default function OccupationsApi(deps?: any) {

    var router = Router();
    router.get("/", GetOccupationsMiddleware({occupationsDataSource: new OccupationsDataSource()}));

    return router;
}