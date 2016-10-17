/// <reference path="../../tsd.d.ts" />
import {Router} from "express";
import {AddUserMiddleware, GetUserMetadata} from "../middlewares";

/**
 * Defines api endpoints and attaches middlewares to them
 * @param deps Dependencies
 * @returns {core.Router} Configured router that will be assigned by the application bootstrapper to an endpoint
 * @constructor
 */
export default function UsersApi(deps?: any) {

    var router = Router();
    // endpoint to process data posted by user
    router.post("/", AddUserMiddleware());
    // Expose metadata of the user model
    router.get("/metadata", GetUserMetadata());

    return router;
}