import { Router, Request, Response } from "express";

export const logoutUser = (router: Router) => router
	.post(
		"/api/users/logout",
		routeHandler
	);

async function routeHandler(req: Request, res: Response) {

	req.session = null;

	res.send();
}
