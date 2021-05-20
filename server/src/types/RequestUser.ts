import { UserDocument } from "../models/user";

export type RequestUser = Omit<UserDocument, "password">;