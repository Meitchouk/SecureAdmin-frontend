import { User } from "../../types/auth/auth.types";
import { UpdateUserType } from "../../types/users/updateUsers.types";
import api from "../api";

// Update an existing user
export async function updateUser(id: number, userData: UpdateUserType): Promise<User> {
    const response = await api.put<User>(`/users/${id}`, userData);
    return response.data;
}