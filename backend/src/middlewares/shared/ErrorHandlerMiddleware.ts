import {Request, Response} from "express";
import WebError from "../../models/weberror.model";

export default function(deps?: any) {
    return function ErrorHandlerMiddleware( error: WebError, req: Request, res: Response, next: Function) {
        let errorResponse = {
            message: "Internal server error",
            status: 500,
            code: "INTERNAL_SERVER_ERROR",
            details: "Please contact system administrator"
        };

        if (error != null) {
            errorResponse.message = error.InnerError.message || errorResponse.message;
            errorResponse.details = error.InnerError.details || errorResponse.details;
            errorResponse.code = error.ErrorCode || errorResponse.code;
            errorResponse.status = error.Status || errorResponse.status;
        }

        res.status(errorResponse.status).json(errorResponse);
    };
}