import api from "../api"; // Importing the configured axios instance

// Delete a role by ID
export async function deleteRole(id: number): Promise<void> {
    await api.delete(`/roles/${id}`);
}