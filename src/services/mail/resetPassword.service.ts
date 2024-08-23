import api from "../api";

interface ResetPasswordResponse {
    success: any;
    message: string;
}

export async function resetPassword(email: string, token: string, password: string): Promise<ResetPasswordResponse> {
    const response = await api.post<ResetPasswordResponse>("/users/reset-password", {
        email,
        token,
        password,
    });
    return response.data;
}
