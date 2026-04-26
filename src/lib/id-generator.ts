import { customAlphabet, nanoid } from "nanoid";

const boardAlphabet =
  "23456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
const makeBoardId = customAlphabet(boardAlphabet, 12);

export const generateBoardId = () => makeBoardId();
export const generateAdminToken = () => nanoid(21);
