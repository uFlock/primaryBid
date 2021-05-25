import { Router } from "express";

import { setUserRoutes } from "./user";
import { setLinkRoutes } from "./link";
import { setMiscRoutes } from "./misc";

export const setAppRoutes = (router: Router) => {
	setUserRoutes(router);
	setLinkRoutes(router);
	setMiscRoutes(router);
};
