/// <reference path="../../../tsd.d.ts" />
import {Request, Response} from "express";
import {User, WebError} from "../../models";

/**
 * Handles user submissions
 * @param deps Middleware dependencies
 * @returns {(request:Request, response:Response, next:Function)=>undefined}
 * @constructor
 */
export default function AddUserMiddleware(deps?: any) {
    return function (request: Request, response: Response, next: Function) {
        let model: User = new User(request.body);

        // If model is valid, return a message, else pass a validation error to the error handler middleware
        model.validate().then(
            (user: User) => response.json({message: "Thank you for your application. We will contact you soon."}),
            (error: any) => next(new WebError(error, 400, "VALIDATION_ERROR"))
        );
    };
}