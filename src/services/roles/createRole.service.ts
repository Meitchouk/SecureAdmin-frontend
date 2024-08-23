import { CreateRoleType } from "../../types/roles/createRole.types";
import { RolesType } from "../../types/roles/roles.types";
import api from "../api"; // Importing the configured axios instance

// Create a new role
export async function createRole(roleData: CreateRoleType): Promise<RolesType> {
    const response = await api.post<RolesType>("/roles", roleData);
    return response.data;
}


