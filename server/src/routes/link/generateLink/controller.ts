import { User } from "../../../models/user";
import { RequestUser } from "../../../types/RequestUser";
import { BadRequestError } from "../../../errors/bad-request-error";

const USER_DOES_NOT_EXIST = 'User is no longer valid';

export const validateGenerateLinkRequest = async (currentUser?: RequestUser) => {

	const user = currentUser && await User.findById(currentUser.id);

	const existingUser = user || null;
	const userId = existingUser?.id || null;

	if (!!currentUser && !user) {
		throw new BadRequestError(USER_DOES_NOT_EXIST);
	}

	return { existingUser, userId };
};
