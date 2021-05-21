import { Router, Request, Response } from "express";

import { currentUser } from "../../../middlewares";
import { validateGenerateLinkRequest } from "./controller";
import { generateShortUrl } from "../../../utils/generateShortUrl";
import { Link, LinkAttributes, LinkDocument } from "../../../models/link";
import { isDuplicateMongoError } from "../../../utils/asserters";

interface createAndSaveShortUrlResult {
	linkDocument: LinkDocument
}

interface createAndSaveShortUrlParams {
	userId: string | null,
	originalLink: string
}

export const generateLink = (router: Router) => router
	.post(
		"/api/links/generate",
		currentUser,
		routeHandler
	);

async function routeHandler(req: Request, res: Response) {

	const currentUser = req.currentUser;

	const { userId } = await validateGenerateLinkRequest(currentUser);
	const { linkDocument } = await createAndSaveShortUrl(userId);

	res.send(linkDocument);
}

async function createAndSaveShortUrl(params: createAndSaveShortUrlParams): Promise<createAndSaveShortUrlResult> {

	const { userId, originalLink } = params;

	const shortLink = generateShortUrl();

	const linkAttributes: LinkAttributes = {
		shortLink,
		originalLink,
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
