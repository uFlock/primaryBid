import { Router } from "express";

import { generateLink } from './generateLink';

export const setLinkRoutes = (router: Router) => {
	generateLink(router);
};