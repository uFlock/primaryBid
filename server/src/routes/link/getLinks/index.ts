import { Router, Request, Response } from "express";
import { check } from "express-validator";

import { currentUser, requireAuth, validateRequest } from "../../../middlewares";
import { Link } from "../../../models/link";

const VALIDATION_ERROR_BOTH_PARAMETERS_REQUIRED = 'Both pageNumber and limit must be supplied';
const VALIDATION_ERROR_MUST_BE_GREATER_THAN_0 = 'Must be greater than 0';

export const getLinks = (router: Router) => router
	.get(
		"/api/links/get",
		[
			check("pageNumber")
				.optional()
				.isInt({ gt: 0 })
				.withMessage(VALIDATION_ERROR_MUST_BE_GREATER_THAN_0)
				.custom((value: number, { req }) => !!req.query?.limit)
				.withMessage(VALIDATION_ERROR_BOTH_PARAMETERS_REQUIRED)
				.default(0),
			check("limit")
				.optional()
				.isInt({ gt: 0 })
				.withMessage(VALIDATION_ERROR_MUST_BE_GREATER_THAN_0)
				.custom((value: number, { req }) => !!req.query?.pageNumber)
				.withMessage(VALIDATION_ERROR_BOTH_PARAMETERS_REQUIRED)
				.default(0)
		],
		validateRequest,
		currentUser,
		requireAuth,
		routeHandler
	);

async function routeHandler(req: Request, res: Response) {

	const currentUser = req.currentUser!;

	const { pageNumber, limit } = req.query;

	const pageNumberToGet = Number(pageNumber);
	const documentsToLimit = Number(limit);
	const documentsToSkip = (pageNumberToGet - 1) * documentsToLimit;

	const result = await Link.find({ creator: currentUser.id })
		.skip(documentsToSkip)
		.limit(documentsToLimit);

	res.send(result);
}