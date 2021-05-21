import { User } from "../../../models/user";
import { RequestUser } from "../../../types/RequestUser";

export const validateGenerateLinkRequest = async (currentUser?: RequestUser) => {

	const user = currentUser && await User.findById(currentUser.id);

	const existingUser = user || null;
	const userId = existingUser?.id || null;

	return { existingUser, userId };
};
