import { nanoid } from "nanoid";

export const generateShortUrl = (length: number = 8) => {

	const shortId = nanoid(length);
	const shortLink = `https://pbid.io/${shortId}`;

	return { shortId, shortLink };
};