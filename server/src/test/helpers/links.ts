import request from "supertest";

import { app } from "../../app";
import { defaultGenerateLinkPayload } from "../payloads";
import { LinkDocument } from "../../models/link";

export async function generateNLinksForUser(userCookie: string[], numberOfLinks: number = 10) {

	const generatedLinks: LinkDocument[] = [];

	for (let i = 0; i < numberOfLinks; i++) {

		const link = await generateLink(userCookie);

		generatedLinks.push(link);
	}

	return { generatedLinks };
}

async function generateLink(userCookie: string[]) {

	const response = await request(app)
		.post("/api/links/generate")
		.set('Cookie', userCookie)
		.send(defaultGenerateLinkPayload)
		.expect(200);

	return response.body;
}

export const expectLinksCreatorToBe = (linksArray: LinkDocument[], creator: string) =>
	linksArray.forEach(link => expect(link.creator).toBe(creator));

export const expectTwoLinksArraysToBeTheSame = (generatedLinks: LinkDocument[], returnedLinks: LinkDocument[]) => {

	expect(returnedLinks.length).toBe(generatedLinks.length);

	const sortedGeneratedLinks = generatedLinks
		.sort((a, b) => a.id.localeCompare(b.id));
	const sortedReturnedLinks = returnedLinks
		.sort((a, b) => a.id.localeCompare(b.id));

	sortedGeneratedLinks.forEach((generatedLink, index) =>
		expect(generatedLink.id).toBe(sortedReturnedLinks[index].id));
};

export const expectSubsetOfLinksToMatchLinks = (returnedLinks: LinkDocument[], generatedLinks: LinkDocument[]) => {

	const returnedLinksIds = returnedLinks.map(({ id }) => id);
	const generatedLinksToCheck = generatedLinks.filter(generatedLink => returnedLinksIds.includes(generatedLink.id));

	expectTwoLinksArraysToBeTheSame(generatedLinksToCheck, returnedLinks);
};
