import api from "../api";
import { AuthResponse } from "../../types/auth/auth.types";
import { Register } from "../../types/auth/register.types";


export async function register(input: Register): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/register", input);
    return response.data;
}
