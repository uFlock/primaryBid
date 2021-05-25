import request from "supertest";

import { app } from '../../../app';
import { registerAndLoginUser } from "../../../test/helpers/registerAndLoginUser";
import { createTestCookie } from "../../../test/helpers/createTestCookie";
import { defaultGenerateLinkPayload, nonExistentUserCookiePayload } from "../../../test/payloads";
import {
	expectLinksCreatorToBe,
	expectSubsetOfLinksToMatchLinks,
	expectTwoLinksArraysToBeTheSame,
	generateNLinksForUser
} from "../../../test/helpers/links";

const ENDPOINT = `/api/links/get`;

describe(`${ENDPOINT} route`, () => {

	it("returns 200 and array of all the short links generated by the user", async () => {

		const numberOfLinksToTest = 10;

		const { cookie, user } = await registerAndLoginUser();
		const { generatedLinks } = await generateNLinksForUser(cookie, numberOfLinksToTest);

		const response = await request(app)
			.get(ENDPOINT)
			.set('Cookie', cookie)
			.send(defaultGenerateLinkPayload)
			.expect(200);

		const returnedLinks = response.body;

		expect(returnedLinks).toBeDefined();

		expectTwoLinksArraysToBeTheSame(generatedLinks, returnedLinks);
		expectLinksCreatorToBe(returnedLinks, user.id);
	});

	it("returns 200 and array of links using pagination", async () => {

		//@TODO develop a proper algorithm
		const numberOfLinksToTest = 100;
		const limit = 10;

		const pagesToTest = 11;
		const emptyPage = 11;

		const { cookie, user } = await registerAndLoginUser();
		const { generatedLinks } = await generateNLinksForUser(cookie, numberOfLinksToTest);

		for (let i = 0; i < pagesToTest; i++) {

			const pageNumber = i + 1;
			const expectedNumberOfReturnedLinks = pageNumber < emptyPage ? limit : 0;

			const response = await request(app)
				.get(ENDPOINT)
				.query({ pageNumber, limit })
				.set('Cookie', cookie)
				.send(defaultGenerateLinkPayload)
				.expect(200);

			const returnedLinks = response.body;

			expect(returnedLinks).toBeDefined();
			expect(returnedLinks.length).toBe(expectedNumberOfReturnedLinks);

			expectSubsetOfLinksToMatchLinks(returnedLinks, generatedLinks);
			expectLinksCreatorToBe(returnedLinks, user.id);
		}
	});

	it("returns 400 if request query is in wrong format", async () => {

		const numberOfLinksToTest = 10;

		const { cookie } = await registerAndLoginUser();

		await generateNLinksForUser(cookie, numberOfLinksToTest);

		const pageNumberTextQuery = { pageNumber: 'text', limit: 1 };
		const pageNumberIsZeroQuery = { pageNumber: 0, limit: 1 };
		const onlyPageNumberSuppliedQuery = { pageNumber: 1 };
		const limitTextQuery = { pageNumber: 1, limit: 'text' };
		const limitIsZeroQuery = { pageNumber: 1, limit: 0 };
		const onlyLimitSuppliedQuery = { limit: 1 };

		const queriesToTest = [
			pageNumberTextQuery,
			pageNumberIsZeroQuery,
			onlyPageNumberSuppliedQuery,
			limitTextQuery,
			limitIsZeroQuery,
			onlyLimitSuppliedQuery
		];

		for (const queryToTest of queriesToTest) {

			await request(app)
				.get(ENDPOINT)
				.query({ pageNumber: 'text', })
				.set('Cookie', cookie)
				.expect(400);
		}
	});

	it("returns 400 if cookie is fake", async () => {

		const cookie = createTestCookie(nonExistentUserCookiePayload, 'fake jwt key');

		await request(app)
			.get(ENDPOINT)
			.set('Cookie', cookie)
			.expect(400);
	});

	it("returns 401 if user is not authorised", async () => {

		const numberOfLinksToTest = 10;

		const { cookie } = await registerAndLoginUser();

		await generateNLinksForUser(cookie, numberOfLinksToTest);

		await request(app)
			.get(ENDPOINT)
			.expect(401);
	});

	it("returns 401 if user no longer exists", async () => {

		const NonExistentUserCookie = createTestCookie(nonExistentUserCookiePayload);

		await request(app)
			.get(ENDPOINT)
			.set('Cookie', NonExistentUserCookie)
			.expect(401);
	});
});
