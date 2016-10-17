/// <reference path="../../../tsd.d.ts" />
import {Request, Response} from "express";
import {WebError} from "../../models";
import Occupation from "../../models/occupation.model";
import {IDataSource} from "../../data";

/**
 * Returns occupations that are stored by a data source
 * @param deps Dependencies that need to be injected for operation
 * @returns {(request:Request, response:Response, next:Function)=>undefined}
 * @constructor
 */
export default function GetOccupationsMiddleware(deps?: {occupationsDataSource: IDataSource<Occupation>}) {
    return function (request: Request, response: Response, next: Function) {
        if (deps != null && deps.occupationsDataSource != null) {
            // if datasource is ready, get the occupations and return it to the client
            response.status(200).json(deps.occupationsDataSource.getAll());
        } else {
            next(new WebError(Error("Occupations data source is offline."), 500, "CONNECTION_ERROR"));
        }
    };
}