import { Router } from "express";

import { setUserRoutes } from "./user";

export const setAppRoutes = (router: Router) => {
	setUserRoutes(router);
};
