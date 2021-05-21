import mongoose, { Schema, Model, Document, Mongoose } from "mongoose";

import { applyIdTransform } from "../utils/formatDocId";

import { UserDocument } from "./user";

export interface LinkAttributes {
	shortLink: string
	originalLink: string
	creator: string | null
	createdAt?: Date
}

export interface LinkDocument extends Document {
	shortLink: string
	originalLink: string
	creator: string | UserDocument | null
	createdAt?: Date
}

interface TaskModel extends Model<LinkDocument> {
	build(attributes: LinkAttributes): LinkDocument;
}

const transform = (doc: any, ret: any) => applyIdTransform(ret);

const LinkSchema: Schema = new Schema(
	{
		shortLink: { type: String, required: true, unique: true, },
		originalLink: { type: String, required: true },
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
