import { Schema } from 'ajv';

export const schema: Schema = {
	type: "object",
	required: ["url"],
	allOf: [
		{
			properties: {
				url: { type: "string", minLength: 15, maxLength: 2000, format: 'url' },
			},
			additionalProperties: false,
		},
	],
};