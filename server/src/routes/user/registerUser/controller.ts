import { User } from "../../../models/user";
import { BadRequestError } from "../../../errors/bad-request-error";

const EMAIL_TAKEN_ERROR = 'Email already taken';

export const validateRegisterRequest = async (email: string) => {

	const existingUser = await User.findOne({ email });

	if (existingUser) {
		throw new BadRequestError(EMAIL_TAKEN_ERROR);
	}
};
