import { Router } from "express";

import { getWhoAmI } from './getWhoAmI';
import { registerUser } from './registerUser';
import { loginUser } from './loginUser';
import { logoutUser } from './logoutUser';

export const setUserRoutes = (router: Router) => {
	getWhoAmI(router);
	registerUser(router);
	loginUser(router);
	logoutUser(router);
};