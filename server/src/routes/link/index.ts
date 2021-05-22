import { Router } from "express";

import { generateLink } from './generateLink';
import { getLinks } from './getLinks';

export const setLinkRoutes = (router: Router) => {
	generateLink(router);
	getLinks(router);
};