import createCors from "cors";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";

import { Express } from 'express';

import { getCorsPolicy, getJwtKey } from "../modules/environment";

export { currentUser } from './current-user';
export { errorHandler } from './error-handler';
export { validateBody } from './json-validator';
export { requireAuth } from './require-auth';
export { validateRequest } from './validate-request';
import { errorHandler } from "./error-handler";

export function setupCors(app: Express) {

	const corsPolicy = getCorsPolicy();

	const corsMiddleware = createCors({
		origin: corsPolicy.allowOrigin,
		credentials: true
	});

	app.use(corsMiddleware);
}

export function setupBodyParser(app: Express) {
	app.use(bodyParser.json());
}

export function setupCookieSession(app: Express) {

	const JWT_KEY = getJwtKey();

	app.use(
		cookieSession({
			name: "session",
			secret: JWT_KEY,
			signed: false, //already using jwt for cookie so no need to sign it
		})
	);
}

export function setupErrorHandler(app: Express) {
	app.use(errorHandler);
}



