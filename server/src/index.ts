import http from "http";
import mongoose, { ConnectionOptions, Mongoose } from "mongoose";

import { app } from "./app";

start()
	.then(() => console.log(`API Server: listening on port ${process.env.PORT}`))
	.catch(console.log);

async function start() {

	try {

		await connectToMongo();

		console.log('Connected to mongo-db');

		const server = app.listen(process.env.PORT);

		// intercept termination requests and terminate gracefully
		process.on("SIGINT", () => handleTermination(server, mongoose));
		process.on("SIGTERM", () => handleTermination(server, mongoose));

	} catch (error) {
		throw new Error(error);
	}
}

async function connectToMongo() {

	console.log('Connecting to mongo-db');

	const connectionOptions: ConnectionOptions = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	};

	return await mongoose.connect(process.env.MONGO_URI!, connectionOptions);
}

const handleTermination = async (server: http.Server, mongoose: Mongoose) => {
	await mongoose.disconnect();
	await httpServerClose(server);
};

const httpServerClose = async (server: http.Server): Promise<boolean> =>
	new Promise((resolve: (result: boolean) => void) =>
		server.close(() => resolve(true)));

