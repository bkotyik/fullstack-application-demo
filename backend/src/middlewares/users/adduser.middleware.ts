/// <reference path="../../../tsd.d.ts" />
import {Request, Response} from "express";
import User from "../../models/user.model";
import WebError from "../../models/weberror.model";

export default function AddUserMiddleware(deps?: any) {
    return function (request: Request, response: Response, next: Function) {
        let model: User = new User(request.body);

        model.validate().then(
            (user: User) => response.json({message: "Thank you for your application. We will contact you soon."}),
            (error: any) => next(new WebError(error, 400, "VALIDATION_ERROR"))
        );
    };
}