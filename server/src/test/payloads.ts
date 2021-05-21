export interface RegisterPayload {
	name?: string
	email?: string
	password?: string
}

export const defaultRegisterPayload: RegisterPayload = {
	name: 'Test Testerson',
	email: 'test@test.com',
	password: 'super_secure_password'
};

export const nonExistentUserCookiePayload = {
	id: '60a6335eabc6aa001fbefeed',
	name: 'Test Testerson',
	email: 'test@test.com',
};

export const defaultLoginPayload = {
	email: 'test@test.com',
	password: 'super_secure_password'
};

export const defaultGenerateLinkPayload = {
	url: 'https://google.com',
};