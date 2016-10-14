"use strict";

export default class WebError {
    private status: number;
    private errorCode: string;

    constructor(private innerError: any, status?: number, errorCode?: string) {
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