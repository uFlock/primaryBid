import { Router, Request, Response } from "express";

import { currentUser, validateBody } from "../../../middlewares";
import { validateGenerateLinkRequest } from "./controller";
import { generateShortUrl } from "../../../utils/generateShortUrl";
import { Link, LinkAttributes, LinkDocument } from "../../../models/link";
import { isDuplicateMongoError } from "../../../utils/asserters";

import { schema } from "./routeSchema";

interface createAndSaveShortUrlResult {
	linkDocument: LinkDocument
}

interface createAndSaveShortUrlParams {
	userId: string | null,
	originalLink: string,
	title?: string | null
}

export const generateLink = (router: Router) => router
	.post(
		"/api/links/generate",
		currentUser,
		validateBody(schema),
		routeHandler
	);

async function routeHandler(req: Request, res: Response) {

	const currentUser = req.currentUser;

	const { url: originalLink } = req.body;

	const { userId, title } = await validateGenerateLinkRequest(originalLink, currentUser);
	const { linkDocument } = await createAndSaveShortUrl({ userId, originalLink, title });

	res.send(linkDocument);
}

async function createAndSaveShortUrl(params: createAndSaveShortUrlParams): Promise<createAndSaveShortUrlResult> {

	const { userId, originalLink, title } = params;

	const { shortId, shortLink } = generateShortUrl();

	const linkAttributes: LinkAttributes = {
		shortId,
		shortLink,
		originalLink,
		title,
		creator: userId,
		createdAt: new Date()
	};

	const linkDocument = Link.build(linkAttributes);

	try {

		await linkDocument.save();

	} catch (error) {

		if (isDuplicateMongoError(error)) {
			return createAndSaveShortUrl(params);
		}

		throw error;
	}

	return { linkDocument };
}
