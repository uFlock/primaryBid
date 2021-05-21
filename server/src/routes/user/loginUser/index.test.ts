import request from "supertest";

import { app } from '../../../app';
import { registerAndLoginUser } from "../../../test/helpers/registerAndLoginUser";
import { defaultLoginPayload } from "../../../test/payloads";
import { createTooLongEmail } from "../../../test/helpers/email";

const ENDPOINT = `/api/users/login`;

describe(`${ENDPOINT} route`, () => {

	it("returns 200, currentUser and a session cookie on successful login", async () => {

		const { user: registeredUser } = await registerAndLoginUser();

		const response = await request(app)
			.post(ENDPOINT)
			.send(defaultLoginPayload)
			.expect(200);

		const cookie = response.get("Set-Cookie");
		const loggedInUser = response.body;

		expect(cookie).toBeDefined();
		expect(loggedInUser).toBeDefined();

		expect(loggedInUser).toMatchObject(registeredUser);
	});

	it("returns 400 if the user does not exist", async () => {

		await request(app)
			.post(ENDPOINT)
			.send(defaultLoginPayload)
			.expect(400);
	});

	it("returns 400 if no credentials supplied", async () => {

		await registerAndLoginUser();

		await request(app)
			.post(ENDPOINT)
			.expect(400);
	});

	it("returns 400 if wrong credentials supplied", async () => {

		const wrongPasswordPayload = { ...defaultLoginPayload, password: 'wrong password' };
		const wrongEmailPayload = { ...defaultLoginPayload, email: 'wrong@email.com' };

		await registerAndLoginUser();

		await request(app)
			.post(ENDPOINT)
			.send(wrongEmailPayload)
			.expect(400);

		await request(app)
			.post(ENDPOINT)
			.send(wrongPasswordPayload)
			.expect(400);
	});

	it("returns 400 if credentials in wrong format", async () => {

		const passwordTooShortPayload = { ...defaultLoginPayload, password: 'short' };
		const emailInvalidFormatPayload = { ...defaultLoginPayload, email: 'invalidEmailFormat' };
		const emailTooLongPayload = { ...defaultLoginPayload, email: createTooLongEmail() };

		await registerAndLoginUser();

		await request(app)
			.post(ENDPOINT)
			.send(passwordTooShortPayload)
			.expect(400);

		await request(app)
			.post(ENDPOINT)
			.send(emailInvalidFormatPayload)
			.expect(400);

		await request(app)
			.post(ENDPOINT)
			.send(emailTooLongPayload)
			.expect(400);
	});
});