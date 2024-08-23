import { User } from "../auth/auth.types";

export interface Roles {
    id: number;
    description: string;
    status: boolean;
    createdAt: Date;
    users: User[];
}
