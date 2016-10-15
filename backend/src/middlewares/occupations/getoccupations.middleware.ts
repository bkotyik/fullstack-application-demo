/// <reference path="../../../tsd.d.ts" />
import {Request, Response} from "express";
import {WebError} from "../../models";

export default function GetOccupationsMiddleware(deps?: any) {
    return function (request: Request, response: Response, next: Function) {
        if (deps != null && deps.occupationsDataSource != null) {
            response.status(200).json(deps.occupationsDataSource.getAll());
        } else {
            next(new WebError(Error("Occupations data source is offline."), 500, "CONNECTION_ERROR"));
        }
    };
}