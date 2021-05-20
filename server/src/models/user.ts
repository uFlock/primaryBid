import mongoose, { Schema, Model, Document, Mongoose } from "mongoose";

import { PasswordManager } from "../utils/passwordManager";
import { applyIdTransform } from "../utils/formatDocId";

export interface UserAttributes {
	email: string;
	name: string;
	password: string;
}

export interface UserDocument extends UserAttributes, Document {}

interface UserModel extends Model<UserDocument> {
	build(attributes: UserAttributes): UserDocument;
}

const transform = (doc: any, ret: any) => {

	delete ret.password;

	return applyIdTransform(ret);
};

const UserSchema: Schema = new Schema(
	{
		email: { type: String, required: true, unique: true },
		name: { type: String, required: true },
		password: { type: String, required: true },
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

export const createUserModel = (mongoose: Mongoose) => {

	UserSchema.statics.build = (attributes: UserAttributes) => new User(attributes);

	// hash password on save
	UserSchema.pre("save", async function (done) {

		if (this.isModified("password")) {

			const hashedPassword = await PasswordManager.toHash(this.get("password"));

			this.set("password", hashedPassword);
		}

		done();
	});

	// hash password on findOneAndUpdate
	UserSchema.pre("findOneAndUpdate", async function (done) {

		const update = this.getUpdate();
		const password = update?.[0]?.$set.password;

		if (password && update) {
			update[0].$set.password = await PasswordManager.toHash(password);
		}

		done();
	});

	const User = mongoose.model<UserDocument, UserModel>("User", UserSchema);

	return User;
};

export const User = createUserModel(mongoose);
