import { nanoid } from "nanoid";

export const generateShortUrl = (length: number = 8) => nanoid(length);