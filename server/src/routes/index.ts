import { Router } from "express";

import { setUserRoutes } from "./user";
import { setLinkRoutes } from "./link";

export const setAppRoutes = (router: Router) => {
	setUserRoutes(router);
	setLinkRoutes(router);
};
