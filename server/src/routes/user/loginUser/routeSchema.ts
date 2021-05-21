import { Schema } from 'ajv';

export const schema: Schema = {
	type: "object",
	required: ["email", "password"],
	allOf: [
		{
			properties: {
				email: { type: "string", format: "email", minLength: 5, maxLength: 150 },
				password: { type: "string", minLength: 8 },
			},
			additionalProperties: false,
		},
	],
};