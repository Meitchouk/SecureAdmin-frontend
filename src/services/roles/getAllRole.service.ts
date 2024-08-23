import { Roles } from "../../types/roles/roles.types";
import api from "../api"; // Importing the configured axios instance

// Get all roles
export async function getRoles(): Promise<Roles[]> {
    const response = await api.get<Roles[]>("/roles");
    return response.data;
}