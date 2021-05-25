import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

import { getMongoConfig } from "../modules/environment";

const MONGO_CONFIG = getMongoConfig();

const mongo = new MongoMemoryServer();

jest.mock("../utils/scrapeTitleFromUrl", () =>
	require("../utils/__mocks__/scrapeTitleFromUrl"));

beforeAll(async () => {

	process.env.JWT_KEY = "super secret key";
	process.env.SHORT_LINK_BASE_URL = 'https://short.ly/';

	const mongoUri = await mongo.getUri();

	await mongoose.connect(mongoUri, MONGO_CONFIG.connectionOptions);
});

// clear data before each test
beforeEach(async () => {

	const collections = await mongoose.connection.db.collections();

	for (let collection of collections) {
		await collection.deleteMany({});
	}
});

afterAll(async () => {
	await mongoose.connection.close();
	await mongo.stop();
});
