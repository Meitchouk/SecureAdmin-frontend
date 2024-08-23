export interface User {
    id: number;
    username: string;
    password?: string;
    email: string;
    name: string;
    status: boolean;
    createdAt: Date;
    roleId: number;
}

export type AuthResponse = {
    message: string;
    access_token: string;
    user: User;
}
