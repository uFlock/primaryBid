export const getEnv = () => environment.appEnvironment;
export const getCorsPolicy = () => environment.corsPolicy;
export const getJwtKey = () => environment.jwtKey;
export const getShortLinkBaseUrl = () => environment.shortLinkBaseUrl;

interface EnvironmentVariables {
	appEnvironment: {
		env: string,
		isLive: boolean,
		isLocal: boolean,
		isDev: boolean
	},
	corsPolicy: {
		allowOrigin: string,
	},
	jwtKey: string,
	shortLinkBaseUrl: string
}

const environment: EnvironmentVariables = {
	appEnvironment: {
		env: process.env.APP_ENV!,
		isLocal: process.env.APP_ENV === 'LOCAL',
		isDev: process.env.APP_ENV === 'DEV',
		isLive: process.env.APP_ENV === 'LIVE',
	},
	corsPolicy: {
		allowOrigin: process.env.ALLOW_CORS_ORIGIN || 'http://localhost:8080'
	},
	jwtKey: process.env.JWT_KEY || 'super secret key',
	shortLinkBaseUrl: process.env.SHORT_LINK_BASE_URL || 'https://pbid.io/'
};