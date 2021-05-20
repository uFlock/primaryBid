import request from "supertest";

import { app } from "../../app";

import { RegisterPayload, defaultRegisterPayload } from "../payloads";

export async function registerAndLoginUser(registerPayload?: RegisterPayload) {

	const payload = registerPayload || defaultRegisterPayload;

	const response = await request(app)
		.post("/api/users/register")
		.send(payload)
		.expect(201);

	const cookie = response.get("Set-Cookie");
	const user = response.body;

	expect(cookie).toBeDefined();
	expect(user).toBeDefined();

	expect(user.email).toEqual(payload.email);

	return { cookie, user, registerPayload: payload };
}
