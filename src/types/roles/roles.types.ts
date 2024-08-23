import { User } from "../auth/auth.types";

export type RolesType = {
    id: number;
    description: string;
    status: boolean;
    createdAt: Date;
    users: User[];
}
