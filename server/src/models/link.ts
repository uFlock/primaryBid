import mongoose, { Schema, Model, Document, Mongoose } from "mongoose";

import { applyIdTransform } from "../utils/formatDocId";

import { UserDocument } from "./user";

export interface LinkAttributes {
	shortId: string
	shortLink: string
	originalLink: string
	title?: string | null
	creator: string | null
	createdAt?: Date
}

export interface LinkDocument extends Document {
	shortId: string
	shortLink: string
	originalLink: string
	title?: string | null
	creator: string | UserDocument | null
	createdAt?: Date
}

interface TaskModel extends Model<LinkDocument> {
	build(attributes: LinkAttributes): LinkDocument;
}

const transform = (doc: any, ret: any) => applyIdTransform(ret);

const LinkSchema: Schema = new Schema(
	{
		shortId: { type: String, required: true, unique: true, },
		shortLink: { type: String, required: true, unique: true, },
		originalLink: { type: String, required: true },
		title: { type: String, required: false },
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: false,
		},
		createdAt: {
			type: mongoose.Schema.Types.Date,
			default: new Date().toISOString(),
			required: true
		}
	},
	{
		toObject: {
			transform,
			versionKey: false,
		},
		toJSON: {
			transform,
			versionKey: false,
		},
	}
);

export const createLinkModel = (mongoose: Mongoose) => {

	LinkSchema.statics.build = (attributes: LinkAttributes) => new Link(attributes);

	const Link = mongoose.model<LinkDocument, TaskModel>("Link", LinkSchema);

	return Link;
};

export const Link = createLinkModel(mongoose);
