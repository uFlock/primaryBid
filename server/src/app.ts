import express, { Router } from "express";
import "express-async-errors";

import { setAppRoutes } from './routes';
import { RequestUser } from "./types/RequestUser";
import {
	setupBodyParser,
	setupCookieSession,
	setupCors,
	setupErrorHandler,
} from "./middlewares";

declare global {
	namespace Express {
		interface Request {
			currentUser?: RequestUser;
		}
	}
}

const app = express();
const appRouter = Router();

setupBodyParser(app);
setupCookieSession(app);
setupCors(app);

setAppRoutes(appRouter);

app.use(appRouter);

setupErrorHandler(app);

export { app };
