import { Roles } from "../../types/roles/roles.types";
import { UpdateRoleType } from "../../types/roles/updateRole.types";
import api from "../api";

// Update an existing role
export async function updateRole(id: number, roleData: UpdateRoleType): Promise<Roles> {
    const response = await api.put<Roles>(`/roles/${id}`, roleData);
    return response.data;
}