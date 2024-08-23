import { Roles } from "../../types/roles/roles.types";
import api from "../api";

// Get a single role by ID
export async function getRoleById(id: number): Promise<Roles | null> {
    try {
        const response = await api.get<Roles>(`/roles/${id}`);
        if (response.data && response.data.status !== undefined) {
            return response.data;
        } else {
            console.error("Error fetching role data: Role not found or invalid response.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching role data:", error);
        return null;
    }
}
