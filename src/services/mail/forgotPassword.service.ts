import api from "../api";

interface ForgotPasswordResponse {
    message: string;
}

export async function forgotPassword(email: string): Promise<ForgotPasswordResponse> {
    const response = await api.post<ForgotPasswordResponse>("/users/forgot-password",
        { email },
        {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
    return response.data;
}
