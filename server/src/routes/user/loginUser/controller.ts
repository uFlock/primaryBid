import { User } from "../../../models/user";
import { BadRequestError } from "../../../errors/bad-request-error";
import { PasswordManager } from "../../../utils/passwordManager";

const LOGIN_ERROR = 'Invalid username or password';

export const validateLoginRequest = async (email: string, password: string) => {

	const existingUser = await User.findOne({ email });

	const passwordMatches = !!existingUser && await PasswordManager.compare(
		existingUser.password,
		password
	);

	if (!passwordMatches) {
		throw new BadRequestError(LOGIN_ERROR);
	}

	return { existingUser };
};
