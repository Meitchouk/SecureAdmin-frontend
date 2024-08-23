import { Roles } from "../../types/roles/roles.types";
import api from "../api"; // Importing the configured axios instance

// Get a single role by ID
export async function getRoleById(id: number): Promise<Roles> {
    const response = await api.get<Roles>(`/roles/${id}`);
    return response.data;
}