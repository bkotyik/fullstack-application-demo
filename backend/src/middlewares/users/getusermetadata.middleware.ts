/// <reference path="../../../tsd.d.ts" />
import {Request, Response} from "express";
import {User, WebError} from "../../models";

export default function AddUserMiddleware(deps?: any) {
    return function (request: Request, response: Response, next: Function) {
        if (User.Schema != null &&
            ((<any>User.Schema)._inner != null) && ((<any>User.Schema)._inner.children) != null) {
            response.json((<any>User.Schema)._inner.children);
        } else {
            next(new WebError({message: "Schema data not available for User"}, 400, "NO_SCHEMA"));
        }
    };
}