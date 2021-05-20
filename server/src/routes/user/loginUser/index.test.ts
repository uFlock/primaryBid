import request from "supertest";

import { app } from '../../../app';

const ENDPOINT = `/api/users/whoami`;

describe(`${ENDPOINT} route`, () => {

	it("returns 200 on any GET request", async () => {

		await request(app)
			.get(ENDPOINT)
			.expect(200);
	});

	it("returns 200 and currentUser is null if non-authenticated user", async () => {

		const response = await request(app)
			.get(ENDPOINT)
			.expect(200);

		expect(response.body?.currentUser).toBe(null);
	});
});