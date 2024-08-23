import { User } from "./auth.types";

export type Register = {
    email: string;
    password: string;
    name: string;
    username: string;
    roleId?: number;
}

export type RegisterResponse = {
    message: string;
    user: User;
}