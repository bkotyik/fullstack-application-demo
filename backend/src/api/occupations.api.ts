/// <reference path="../../tsd.d.ts" />
import {Router} from "express";
import {GetOccupationsMiddleware} from "../middlewares";
import {OccupationsDataSource} from "../data";

/**
 * Defines api endpoints and attaches middlewares to them
 * @param deps Dependencies
 * @returns {core.Router} Configured router that will be assigned by the application bootstrapper to an endpoint
 * @constructor
 */
export default function OccupationsApi(deps?: any) {

    var router = Router();
    // GetOccupationsMiddleware should be invoked when occupationApi receives a HTTP GET request on / endpoint
    router.get("/", GetOccupationsMiddleware({occupationsDataSource: new OccupationsDataSource()}));

    return router;
}