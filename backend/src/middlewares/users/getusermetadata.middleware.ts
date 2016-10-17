/// <reference path="../../../tsd.d.ts" />
import {Request, Response} from "express";
import {User, WebError} from "../../models";

/**
 * Workaround for serializing RegExpressions to string
 * @param key Name of the property to be serialized
 * @param value Value of the property
 * @returns {any} Serialized value
 */
function replacer(key: string, value: any): any {
    // If value is an object and instance of a regex serialize it to string
    if (typeof value === "object"
        && value instanceof RegExp) {
        return value.toString();
    } else {
        return value;
    }
}

/**
 * Exposes User model schema as metadata for the frontend validation.
 * Notice that this is for demonstration purposes only.
 * A real world solution should not depend on private properties of model framework.
 * More complex frameworks like mongoose gives you solution out of the box
 * @param deps Dependencies of the middleware.
 * @returns {(request:Request, response:Response, next:Function)=>undefined}
 * @constructor
 */
export default function GetUserMetadataMiddleware(deps?: any) {
    return function (request: Request, response: Response, next: Function) {
        if (User.Schema != null &&
            ((<any>User.Schema)._inner != null) && ((<any>User.Schema)._inner.children) != null) {
            response.status(200).set("Content-Type", "application/json").send(JSON.stringify((<any>User.Schema)._inner.children, replacer));
        } else {
            next(new WebError({message: "Schema data not available for User"}, 400, "NO_SCHEMA"));
        }
    };
}