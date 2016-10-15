import {Request, MediaType, Application, Response} from "express";
import EventEmitter = NodeJS.EventEmitter;

import net = require("net");

export  default class MockRequest implements Request {

	accepted: MediaType[];
	protocol: string;
	secure: boolean;
	ip: string;
	ips: string[];
	subdomains: string[];
	path: string;
	hostname: string;
	host: string;
	fresh: boolean;
	stale: boolean;
	xhr: boolean;
	body: any;
	cookies: any;
	method: string;
	params: any;
	user: any;
	authenticatedUser: any;
	query: any;
	route: any;
	signedCookies: any;
	originalUrl: string;
	url: string;
	baseUrl: string;
	app: Application;
	connection: net.Socket;
	httpVersion: string;
	headers: any;
	rawHeaders: string[];
	trailers: any;
	rawTrailers: any;
	socket: net.Socket;
	readable: boolean;

	get(name: string): string {
		return undefined;
	}

	header(name: string): string {
		return undefined;
	}

	accepts(type: string | string[]): string {
		return undefined;
	}

	acceptsCharsets(charset?: string|string[]): string[] {
		return undefined;
	}

	acceptsEncodings(encoding?: string|string[]): string[] {
		return undefined;
	}

	acceptsLanguages(lang?: string|string[]): string[] {
		return undefined;
	}

	range(size: number): any[] {
		return undefined;
	}

	param(name: string, defaultValue?: any): string {
		return undefined;
	}

	is(type: string): boolean {
		return undefined;
	}

	clearCookie(name: string, options?: any): Response {
		return undefined;
	}

	logout(): void {
		return undefined;
	}

	isAuthenticated(): boolean {
		return undefined;
	}

	isUnauthenticated(): boolean {
		return undefined;
	}

	login(user: any, options?: Object, done?: (err: any)=>void): void {
		return undefined;
	}

	logIn(user: any, options?: Object, done?: (err: any)=>void): void {
		return undefined;
	}

	logOut(): void {
		return undefined;
	}

	setTimeout(msecs: number, callback: Function): NodeJS.Timer {
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

	prependListener(event: string, listener: Function): any {
		return undefined;
	}

	prependOnceListener(event: string, listener: Function): any {
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

	_read(size: number): void {
	}

	read(size?: number): any | string | Buffer {
		return undefined;
	}

	setEncoding(encoding: string): void {
	}

	pause(): void {
	}

	resume(): void {
	}

	pipe<T extends NodeJS.WritableStream>(destination: T, options?: {end?: boolean}): T {
		return undefined;
	}

	unpipe<T extends NodeJS.WritableStream>(destination?: T): void {
	}

	wrap(oldStream: NodeJS.ReadableStream): NodeJS.ReadableStream {
		return undefined;
	}

	push(chunk: any, encoding?: string): boolean {
		return undefined;
	}

	unshift(chunk: string | Buffer | any): void {
	}
}