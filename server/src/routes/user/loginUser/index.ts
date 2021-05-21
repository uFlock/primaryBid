import { Router, Request, Response } from "express";

import { validateBody } from "../../../middlewares";
import { createToken } from "../../../utils/createJwtToken";

import { validateLoginRequest } from "./controller";
import { schema } from './routeSchema';

export const loginUser = (router: Router) => router
	.post(
		"/api/users/login",
		validateBody(schema),
		routeHandler
	);

async function routeHandler(req: Request, res: Response) {

	const { email, password } = req.body;

	const { existingUser } = await validateLoginRequest(email, password);
	const jwt = createToken(existingUser!.toObject());

	req.session = { jwt };

	res.send(existingUser);
}
