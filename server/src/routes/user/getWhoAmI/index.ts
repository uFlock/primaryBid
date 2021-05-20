import { Router, Request, Response } from "express";

import { currentUser } from "../../../middlewares";
import { validateWhoAmIRequest } from "./controller";

export const getWhoAmI = (router: Router) => router
	.get(
		"/api/users/whoami",
		currentUser,
		routeHandler
	);

async function routeHandler(req: Request, res: Response) {

	const currentUser = req.currentUser;

	const { existingUser } = await validateWhoAmIRequest(currentUser);

	res.send({ currentUser: existingUser });
}
