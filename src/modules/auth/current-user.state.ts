import { atom } from "jotai";
import type { User } from "../users/users.entity";


export const currentUserAtom = atom<User>()


