import jwt from "jsonwebtoken";

import { UserAttributes } from "../models/user";

export const createToken = (user: UserAttributes) => jwt.sign(user, process.env.JWT_KEY!);
