import { User } from "../../../models/user";
import { RequestUser } from "../../../types/RequestUser";

export const validateWhoAmIRequest = async (currentUser?: RequestUser) => {

	const existingUser = currentUser && await User.findById(currentUser.id);

	return { existingUser: existingUser || null };
};
