import bcrypt from "bcrypt";

export class PasswordManager {

	static async toHash(password: string) {

		const salt = await bcrypt.genSalt(10);

		return await bcrypt.hash(password, salt);
	}

	static async compare(storedPassword: string, suppliedPassword: string) {
		return await bcrypt.compare(suppliedPassword, storedPassword);
	}
}
