import { User } from "../../../models/user";
import { RequestUser } from "../../../types/RequestUser";
import { BadRequestError } from "../../../errors/bad-request-error";
import { scrapeTitleFromUrl } from "../../../utils/scrapeTitleFromUrl";


const SHORT_LINK_BASE_URL = 'https://pbid.io/';

const ERRORS = {
	USER_DOES_NOT_EXIST: 'User is no longer valid',
	LINK_ALREADY_SHORTENED: `Is already a ${SHORT_LINK_BASE_URL} link`
};

const isLinkAlreadyShortened = (originalLink: string) =>
	originalLink.substr(0, SHORT_LINK_BASE_URL.length) === SHORT_LINK_BASE_URL;

export const validateGenerateLinkRequest = async (originalLink: string, currentUser?: RequestUser) => {

	const user = currentUser && await User.findById(currentUser.id);

	const existingUser = user || null;
	const userId = existingUser?.id || null;

	const linkIsAlreadyShortUrl = isLinkAlreadyShortened(originalLink);

	if (!!currentUser && !user) {
		throw new BadRequestError(ERRORS.USER_DOES_NOT_EXIST);
	}

	if (linkIsAlreadyShortUrl) {
		throw new BadRequestError(ERRORS.LINK_ALREADY_SHORTENED);
	}

	const { title } = await scrapeTitleFromUrl(originalLink);

	return { existingUser, userId, title };
};
