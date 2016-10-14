/// <reference path="../../tsd.d.ts" />
import {Request, Response} from "express";
import UserModel from "../models/user.model";

export default function AddUserMiddleware(deps?: any) {
    return function(request: Request, response: Response, next: Function) {
        let model: UserModel = null;
        try {
            model = new UserModel(request.body);
        } catch (error) {
            next(error);
        }

        // TODO: Check if model is valid

        response.json({message: "Thank you for your application. We will contact you soon."});
    };
}