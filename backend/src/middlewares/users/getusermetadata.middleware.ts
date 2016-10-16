/// <reference path="../../../tsd.d.ts" />
import {Request, Response} from "express";
import {User, WebError} from "../../models";

function replacer(key: string, value: any): any {
    if (typeof value == "object"
        && value instanceof RegExp) {
        return value.toString();
    } else {
        return value;
    }
}

export default function AddUserMiddleware(deps?: any) {
    return function (request: Request, response: Response, next: Function) {
        if (User.Schema != null &&
            ((<any>User.Schema)._inner != null) && ((<any>User.Schema)._inner.children) != null) {
            response.status(200).set("Content-Type","application/json").send(JSON.stringify((<any>User.Schema)._inner.children, replacer));
        } else {
            next(new WebError({message: "Schema data not available for User"}, 400, "NO_SCHEMA"));
        }
    };
}