import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

const mongo = new MongoMemoryServer();

jest.mock("../utils/scrapeTitleFromUrl", () => require("../utils/__mocks__/scrapeTitleFromUrl"));

beforeAll(async () => {

	process.env.JWT_KEY = "super secret key";
	process.env.SHORT_LINK_BASE_URL = 'https://short.ly/';

	const mongoUri = await mongo.getUri();

	await mongoose.connect(mongoUri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	});
});

// clear data before each test
beforeEach(async () => {

	// jest.mock("../routes/link/generateLink/controller", () => ({
	// 	...jest.requireActual('../routes/link/generateLink/controller'),
	// 	scrapeTitleFromUrl: jest.fn((url: string) => {
	// 		console.log(url);
	// 		return Promise.resolve({ title: 'google' });
	// 	})
	//
	// }));

	const collections = await mongoose.connection.db.collections();

	for (let collection of collections) {
		await collection.deleteMany({});
	}
});

afterAll(async () => {
	await mongoose.connection.close();
	await mongo.stop();
});
