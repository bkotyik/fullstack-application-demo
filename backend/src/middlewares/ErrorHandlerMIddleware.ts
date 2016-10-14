import {Request, Response} from "express";

export default function(deps?: any) {
    return function(req: Request, res: Response, next: Function, error: any) {
        let errorResponse = {
            message: "Internal server error",
            status: 500,
            details: []
        };

        if (error != null) {
            errorResponse.message = error.message || errorResponse.message;
            errorResponse.details = error.message || errorResponse.details;
            errorResponse.status = error.status || errorResponse.status;
        }

        resp.json(errorResponse);
    };
}