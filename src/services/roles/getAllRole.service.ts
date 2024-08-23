import { RolesType } from "../../types/roles/roles.types";
import api from "../api"; // Importing the configured axios instance

// Get all roles
export async function getRoles(): Promise<RolesType[]> {
    const response = await api.get<RolesType[]>("/roles");
    return response.data;
}