import { User } from "../../types/auth/auth.types";
import api from "../api";

// Get a single user by ID
export async function getUserById(id: number): Promise<User> {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
}