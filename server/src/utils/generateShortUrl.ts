import { nanoid } from "nanoid";
import { getShortLinkBaseUrl } from "../modules/environment";

const SHORT_LINK_BASE_PATH = getShortLinkBaseUrl();

export const generateShortUrl = (length: number = 8) => {

	const shortId = nanoid(length);
	const shortLink = SHORT_LINK_BASE_PATH + shortId;

	return { shortId, shortLink };
};