import request from "supertest";

import { app } from '../../../app';
import { registerAndLoginUser } from "../../../test/helpers/registerAndLoginUser";
import { createTestCookie } from "../../../test/helpers/createTestCookie";
import { defaultGenerateLinkPayload, nonExistentUserCookiePayload } from "../../../test/payloads";
import { LinkDocument } from "../../../models/link";
import { getShortLinkBaseUrl } from "../../../modules/environment";

const ENDPOINT = `/api/links/generate`;
const P_BID_URL = getShortLinkBaseUrl();

describe(`${ENDPOINT} route`, () => {

	it("returns 200 and linkDocument without creator if not logged in", async () => {

		const response = await request(app)
			.post(ENDPOINT)
			.send(defaultGenerateLinkPayload)
			.expect(200);

		const linkDocument = response.body as LinkDocument;

		expect(linkDocument.creator).toBe(null);
		expect(linkDocument.shortLink).toContain(P_BID_URL);
		expect(linkDocument.originalLink).toBe(defaultGenerateLinkPayload.url);
	});

	it("returns 200 and linkDocument with creator if logged in", async () => {

		const { cookie, user } = await registerAndLoginUser();

		const response = await request(app)
			.post(ENDPOINT)
			.set('Cookie', cookie)
			.send(defaultGenerateLinkPayload)
			.expect(200);

		const linkDocument = response.body as LinkDocument;

		expect(linkDocument.creator).toBe(user.id);
		expect(linkDocument.shortLink).toContain(P_BID_URL);
		expect(linkDocument.originalLink).toBe(defaultGenerateLinkPayload.url);
	});

	it("returns 400 if url is already shortened", async () => {

		const tooShortUrlPayload = { ...defaultGenerateLinkPayload, url: `${P_BID_URL}xxxxxxxx` };

		await request(app)
			.post(ENDPOINT)
			.send(tooShortUrlPayload)
			.expect(400);
	});

	it("returns 400 if url is too short", async () => {

		const tooShortUrlPayload = { ...defaultGenerateLinkPayload, url: 'https//h.be' };

		await request(app)
			.post(ENDPOINT)
			.send(tooShortUrlPayload)
			.expect(400);
	});

	it("returns 400 if url is wrong format", async () => {

		const wrongFormatUrlPayload = { ...defaultGenerateLinkPayload, url: 'I am not a url buddy' };

		await request(app)
			.post(ENDPOINT)
			.send(wrongFormatUrlPayload)
			.expect(400);
	});

	it("returns 400 if cookie is fake", async () => {

		const cookie = createTestCookie(nonExistentUserCookiePayload, 'fake jwt key');

		await request(app)
			.post(ENDPOINT)
			.set('Cookie', cookie)
			.send(defaultGenerateLinkPayload)
			.expect(400);
	});

	it("returns 400 if user is logged in but does not exist", async () => {

		const cookie = createTestCookie(nonExistentUserCookiePayload);

		await request(app)
			.post(ENDPOINT)
			.set('Cookie', cookie)
			.send(defaultGenerateLinkPayload)
			.expect(400);

	});
});