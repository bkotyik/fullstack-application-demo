"use strict";

/**
 * Wraps a Node error into a custom error object
 */
export default class WebError {
    // Status to be sent at the end of the pipeline
    private status: number;
    // Error code which describes the type of the error that occured
    private errorCode: string;

    constructor(private innerError: any, status?: number, errorCode?: string) {
        // Set up defaults
        this.status = status || 500;
        this.errorCode = errorCode || "INTERNAL_SERVER_ERROR";
    }

    get InnerError() {
        return this.innerError;
    }

    get Status() {
        return this.status;
    }

    get ErrorCode() {
        return this.errorCode;
    }
}