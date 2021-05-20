import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

const mongo = new MongoMemoryServer();

beforeAll(async () => {

	process.env.JWT_KEY = "super secret key";

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

	const collections = await mongoose.connection.db.collections();

	for (let collection of collections) {
		await collection.deleteMany({});
	}
});

afterAll(async () => {
    await mongoose.connection.close();
	await mongo.stop();
});
