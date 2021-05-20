import { Router, Request, Response } from "express";

import { User } from "../../../models/user";
import { validateBody } from "../../../middlewares";
import { createToken } from "../../../utils/createJwtToken";

import { schema } from './routeSchema';
import { validateRegisterRequest } from "./controller";

export const registerUser = (router: Router) => router
	.post(
		"/api/users/register",
		validateBody(schema),
		routeHandler
	);

async function routeHandler(req: Request, res: Response) {

	const { email, name, password } = req.body;

	await validateRegisterRequest(email);

	const user = User.build({ email, name, password });
	const registeredUser = await user.save();

	const jwt = createToken(registeredUser!.toObject());

	req.session = { jwt };

	res
		.status(201)
		.send(registeredUser);
}
