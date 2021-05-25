import jwt from "jsonwebtoken";

import { UserAttributes } from "../models/user";
import { getJwtKey } from "../modules/environment";

const JWT_KEY = getJwtKey();

export const createToken = (user: UserAttributes) => jwt.sign(user, JWT_KEY);
