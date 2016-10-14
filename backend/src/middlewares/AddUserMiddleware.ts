/// <reference path="../../tsd.d.ts" />
import {Request, Response} from "express";
import User from "../models/user.model";

export default function AddUserMiddleware(deps?: any) {
    return function (request: Request, response: Response, next: Function) {
        let model: User = new User(request.body);

        model.validate().then(
            (user: User) => response.json({message: "Thank you for your application. We will contact you soon."}),
            (error: any) => next(error)
        );
    };
}