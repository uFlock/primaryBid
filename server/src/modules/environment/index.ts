import { ConnectionOptions } from "mongoose";

const ENV = process.env.APP_ENV || 'DEV';

export const getEnv = () => environment.appEnvironment;
export const getServerConfig = () => environment.server;
export const getCorsPolicy = () => environment.corsPolicy;
export const getJwtKey = () => environment.jwtKey;
export const getShortLinkBaseUrl = () => environment.shortLinkBaseUrl;
export const getMongoConfig = () => environment.mongo;

const requiredEnvVariables = [
	'ALLOW_CORS_ORIGIN',
	'MONGO_URI',
	'ALLOW_CORS_ORIGIN',
	'JWT_KEY',
	'SHORT_LINK_BASE_URL',
	'PORT'
];

export const validateEnvironment = () => requiredEnvVariables
	.forEach(variable => validateEnvVariable(variable));

interface EnvironmentVariables {
	appEnvironment: {
		env: string
		isLive: boolean
		isDev: boolean
	},
	server: {
		port: number;
	}
	mongo: {
		uri: string,
		connectionOptions: ConnectionOptions
	}
	corsPolicy: {
		allowOrigin: string
	},
	jwtKey: string,
	shortLinkBaseUrl: string
}

const environment: EnvironmentVariables = {
	appEnvironment: {
		env: ENV,
		isDev: ENV === 'DEV',
		isLive: ENV === 'LIVE',
	},
	server: {
		port: (process.env.PORT as number | undefined) || 3000
	},
	mongo: {
		uri: process.env.MONGO_URI || 'mongodb://mongo-db:27017',
		connectionOptions: {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		}
	},
	corsPolicy: {
		allowOrigin: process.env.ALLOW_CORS_ORIGIN || 'http://localhost:8080'
	},
	jwtKey: process.env.JWT_KEY || 'super secret key',
	shortLinkBaseUrl: process.env.SHORT_LINK_BASE_URL || 'https://pbid.io/'
};

function validateEnvVariable(envVariableName: string) {

	if (!process.env[envVariableName]) {
		throwEnvError(envVariableName);
	}
}

function throwEnvError(envVariableName: string) {
	throw new Error(`${envVariableName} - environmental variable must be set`);
}