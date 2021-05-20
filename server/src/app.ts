import express, { Router } from "express";
import bodyParser from "body-parser";

import "express-async-errors";
import cookieSession from "cookie-session";

import { setAppRoutes } from './routes';
import { RequestUser } from "./types/RequestUser";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares";

declare global {
	namespace Express {
		interface Request {
			currentUser?: RequestUser;
		}
	}
}

// import cors from "cors";



const app = express();

const appRouter = Router();

setAppRoutes(appRouter);

app.use((req, res, next) =>
	bodyParser.json() (req, res, next));

app.use(
	cookieSession({
		name: "session",
		secret: "super secret key",
		signed: false,
	})
);

app.use(appRouter);

app.get('/alive', async (req, res) => res
	.status(200)
	.send('It Lives'));

app.all("*", () => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
