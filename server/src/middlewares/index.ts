import cors from "cors";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";

import { Express } from 'express';

export { currentUser } from './current-user';
export { errorHandler } from './error-handler';
export { validateBody } from './json-validator';
export { requireAuth } from './require-auth';
export { validateRequest } from './validate-request';
import { errorHandler } from "./error-handler";

export function setupCors(app: Express) {

	const corsMiddleware = cors({
		origin: 'http://localhost:8080',
		credentials: true
	});

	app.use(corsMiddleware);
}

export function setupBodyParser(app: Express) {
	app.use(bodyParser.json());
}

export function setupCookieSession(app: Express) {
	app.use(
		cookieSession({
			name: "session",
			secret: "super secret key",
			signed: false,
		})
	);
}

export function setupErrorHandler(app: Express) {
	app.use(errorHandler);
}



