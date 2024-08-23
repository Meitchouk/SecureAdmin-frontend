import { CreateRoleType } from "../../types/roles/createRole.types";
import { Roles } from "../../types/roles/roles.types";
import api from "../api"; // Importing the configured axios instance

// Create a new role
export async function createRole(roleData: CreateRoleType): Promise<Roles> {
    const response = await api.post<Roles>("/roles", roleData);
    return response.data;
}


