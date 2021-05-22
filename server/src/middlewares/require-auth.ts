import { Request, Response, NextFunction } from "express";

import { User } from "../models/user";
import { NotAuthorizedError } from "../errors/not-authorized-error";


export const requireAuth = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {

	const currentUser = req.currentUser;

	const user = currentUser && await User.findById(currentUser.id);

	if (!currentUser || !user) {
		throw new NotAuthorizedError();
	}

	req.currentUser = user!;

	next();
};
