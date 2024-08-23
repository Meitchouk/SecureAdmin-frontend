import { User } from "../../types/auth/auth.types";
import { CreateUserType } from "../../types/users/createUsers.types";
import api from "../api"; // Importing the configured axios instance

// Create a new user
export async function createUser(userData: CreateUserType): Promise<User> {
    const response = await api.post<User>("/users", userData);
    return response.data;
}