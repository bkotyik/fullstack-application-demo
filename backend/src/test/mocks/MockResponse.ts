import {Response, Send, Errback} from "express";
import EventEmitter = NodeJS.EventEmitter;

import net = require("net");
import {CookieOptions} from "express-serve-static-core";
import {ServerResponse} from "http";

export  default class MockResponse implements Response {
	send: Send;
	json: Send;
	jsonp: Send;
	headersSent: boolean;
	locals: any;
	charset: string;
	statusCode: number;
	statusMessage: string;
	sendDate: boolean;
	finished: boolean;
	writable: boolean;

	status(code: number): Response {
		return undefined;
	}

	sendStatus(code: number): Response {
		return undefined;
	}

	links(links: any): Response {
		return undefined;
	}

	sendfile(path: string, options?: any | Errback, fn?: Errback): void {
		return undefined;
	}

	sendFile(path: string, options?: any | Errback, fn?: Errback): void {
		return undefined;
	}

	download(path: string, filename?: string | Errback, fn?: Errback): void {
		return undefined;
	}

	contentType(type: string): Response {
		return undefined;
	}

	type(type: string): Response {
		return undefined;
	}

	format(obj: any): Response {
		return undefined;
	}

	attachment(filename?: string): Response {
		return undefined;
	}

	set(field: string, value?: string): Response {
		return undefined;
	}

	header(field: string, value?: string): Response {
		return undefined;
	}

	get(field: string): string {
		return undefined;
	}

	clearCookie(name: string, options?: any): Response {
		return undefined;
	}

	cookie(name: string, val: any | string, options?: CookieOptions): Response {
		return undefined;
	}

	location(url: string): Response {
		return undefined;
	}

	redirect(url?: string | number, status?: number | string): void {
		return undefined;
	}

	render(view: string, options?: Object, callback?: (err: Error, html: string) => void): void {
		return undefined;
	}

	getHeader(name: string): string {
		return undefined;
	}

	removeHeader(name: string): void {
		return undefined;
	}


	addTrailers(headers: any): void {
		return undefined;
	}

	end(str?: string | Buffer | any, encoding?: string | Function, cb?: Function): void {
		return undefined;
	}

	setHeader(name: string, value: string|string[]): void {
		return undefined;
	}

	setTimeout(msecs: number, callback: Function): ServerResponse {
		return undefined;
	}

	prependListener(event: string, listener: Function): any {
		return undefined;
	}

	prependOnceListener(event: string, listener: Function): any {
		return undefined;
	}

	addListener(event: string, listener: Function): EventEmitter | any | NodeJS.EventEmitter {
		return undefined;
	}

	on(event: string, listener: Function): any | EventEmitter | NodeJS.EventEmitter {
		return undefined;
	}

	once(event: string, listener: Function): any | EventEmitter | NodeJS.EventEmitter {
		return undefined;
	}

	removeListener(event: string, listener: Function): any | EventEmitter | NodeJS.EventEmitter {
		return undefined;
	}

	removeAllListeners(event?: string): any | EventEmitter | NodeJS.EventEmitter {
		return undefined;
	}

	setMaxListeners(n: number): any | void {
		return undefined;
	}

	getMaxListeners(): number {
		return undefined;
	}

	listeners(event: string): Function[] {
		return undefined;
	}

	emit(event: string, args: any): boolean {
		return undefined;
	}

	eventNames(): string[] {
		return undefined;
	}

	listenerCount(type: string): number {
		return undefined;
	}

	_write(chunk: any, encoding: string, callback: Function): void {
	}

	write(str: string | Buffer | any, encoding?: string | Function, cb?: Function | string): boolean {
		return undefined;
	}

	writeContinue(): void {
		return undefined;
	}

	writeHead(statusCode: number, reasonPhrase?: string, headers?: any): void {
		return undefined;
	}

}