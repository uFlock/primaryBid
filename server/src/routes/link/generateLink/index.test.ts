import request from "supertest";

import { app } from '../../../app';
import { registerAndLoginUser } from "../../../test/helpers/registerAndLoginUser";
import { createTestCookie } from "../../../test/helpers/createTestCookie";
import { nonExistentUserCookiePayload } from "../../../test/payloads";

const ENDPOINT = `/api/users/whoami`;

const expectCurrentUserToEqual = (currentUser: any, equalTo: any) => {
	expect(currentUser).toBeDefined();
	expect(currentUser).toEqual(equalTo);
};

describe(`${ENDPOINT} route`, () => {

	it("returns 200 on any GET request", async () => {

		await request(app)
			.get(ENDPOINT)
			.expect(200);
	});

	it("returns 200 and currentUser is null if not authenticated", async () => {

		await registerAndLoginUser();

		const response = await request(app)
			.get(ENDPOINT)
			.expect(200);

		const currentUser = response.body?.currentUser;

		expectCurrentUserToEqual(currentUser, null);
	});

	it("returns 200 and currentUser on authenticated request", async () => {

		const { cookie, user } = await registerAndLoginUser();

		const response = await request(app)
			.get(ENDPOINT)
			.set('Cookie', cookie)
			.expect(200);

		const currentUser = response.body?.currentUser;

		expectCurrentUserToEqual(currentUser, user);
	});

	it("returns 400 if not authentic cookie supplied", async () => {

		const fakeCookie = createTestCookie('testPayload', 'broomKey');

		await registerAndLoginUser();

		await request(app)
			.get(ENDPOINT)
			.set('Cookie', fakeCookie)
			.expect(400);
	});

	it("returns 200 and currentUser null if user no longer exists", async () => {

		const cookie = createTestCookie(nonExistentUserCookiePayload);

		const response = await request(app)
			.get(ENDPOINT)
			.set('Cookie', cookie)
			.expect(200);

		const currentUser = response.body?.currentUser;

		expectCurrentUserToEqual(currentUser, null);
	});
});