import { User } from "../../types/auth/auth.types";
import api from "../api";

// Get all users
export async function getUsers(): Promise<User[]> {
    const response = await api.get<User[]>("/users");
    return response.data;
}

