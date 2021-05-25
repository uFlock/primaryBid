import request from "supertest";

import { app } from '../../../app';

const ENDPOINT = `/api/users/logout`;

describe(`${ENDPOINT} route`, () => {

	it("returns 200 to any request and sets session to null", async () => {

		const response = await request(app)
			.post(ENDPOINT)
			.expect(200);

		const cookie = response.get("Set-Cookie");
		const sessionUnset = cookie[0].includes('session=;');

		expect(cookie).toBeDefined();
		expect(sessionUnset).toBe(true);
	});
});