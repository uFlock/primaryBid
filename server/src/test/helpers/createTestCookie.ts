import jwt from "jsonwebtoken";

import { getJwtKey } from '../../modules/environment';

const JWT_KEY = getJwtKey();

export function createTestCookie(payload: any, jwtKey?: string,) {

	const jwtKeyToUse = jwtKey || JWT_KEY!;

	const token = jwt.sign(payload, jwtKeyToUse);

	const session = { jwt: token };

	const sessionJSON = JSON.stringify(session);

	const base64 = Buffer.from(sessionJSON).toString("base64");

	return [`session=${base64}`];
}
