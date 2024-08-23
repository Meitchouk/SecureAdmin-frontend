import api from "../api";

// Delete a user by ID
export async function deleteUser(id: number): Promise<void> {
    await api.delete(`/users/${id}`);
}