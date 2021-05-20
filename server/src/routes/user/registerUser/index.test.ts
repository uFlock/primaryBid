import request from "supertest";

import { app } from '../../../app';
import { registerAndLoginUser } from "../../../test/helpers/registerAndLoginUser";
import { defaultRegisterPayload, RegisterPayload } from "../../../test/payloads";
import { ValueOf } from "../../../types/ValueOf";

const ENDPOINT = `/api/users/register`;

const createRegisterPayloadWithout = (key: keyof RegisterPayload) => {

	const registerPayload = { ...defaultRegisterPayload };

	delete registerPayload[key];

	return registerPayload;
};

const createRegisterPayloadWithDifferent = (key: keyof RegisterPayload, value: ValueOf<RegisterPayload>) => {

	const registerPayload = { ...defaultRegisterPayload };

	registerPayload[key] = value;

	return registerPayload;
};

describe(`${ENDPOINT} route`, () => {

	it("returns 201 and currentUser with a jwt cookie on successful request", async () => {
		await registerAndLoginUser();
	});


	it("returns 400 when password is not supplied", async () => {

		const payload = createRegisterPayloadWithout('password');

		await request(app)
			.post(ENDPOINT)
			.send(payload)
			.expect(400);
	});

	it("returns 400 when name is not supplied", async () => {

		const payload = createRegisterPayloadWithout('name');

		await request(app)
			.post(ENDPOINT)
			.send(payload)
			.expect(400);
	});

	it("returns 400 when email not supplied", async () => {

		const payload = createRegisterPayloadWithout('email');

		await request(app)
			.post(ENDPOINT)
			.send(payload)
			.expect(400);
	});

	it("returns 400 when password is wrong format", async () => {

		const payload = createRegisterPayloadWithDifferent('password', 'short');

		await request(app)
			.post(ENDPOINT)
			.send(payload)
			.expect(400);
	});

	it("returns 400 when name is wrong format", async () => {

		const x = 'x';

		const payloadShortName = createRegisterPayloadWithDifferent('name', x.repeat(4));
		const payloadLongName = createRegisterPayloadWithDifferent('name', x.repeat(151));

		await request(app)
			.post(ENDPOINT)
			.send(payloadShortName)
			.expect(400);

		await request(app)
			.post(ENDPOINT)
			.send(payloadLongName)
			.expect(400);
	});

	it("returns 400 when email is wrong format", async () => {

		const x = 'x';

		const shortEmail = 'a@f';
		const longEmail = x.repeat(10) + '@' + x.repeat(140) + '.com';

		const payloadShortEmail = createRegisterPayloadWithDifferent('email', shortEmail);
		const payloadLongEmail = createRegisterPayloadWithDifferent('name', longEmail);

		await request(app)
			.post(ENDPOINT)
			.send(payloadShortEmail)
			.expect(400);

		await request(app)
			.post(ENDPOINT)
			.send(payloadLongEmail)
			.expect(400);
	});
});