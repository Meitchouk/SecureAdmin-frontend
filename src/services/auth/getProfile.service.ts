import { UserProfile } from "../../types/auth/userProfile.types";
import api from "../api";

export async function getProfile(): Promise<UserProfile> {
    try {
        const response = await api.get<UserProfile>('/auth/profile');
        return response.data;
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
}
