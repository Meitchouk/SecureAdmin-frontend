import api from './axios'; // Reutilizando la instancia preconfigurada

export const login = async (email: string, password: string) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    } catch (error) {
        // Manejo de errores específico del servicio
        throw (error as unknown as { response?: { data: unknown } }).response?.data || 'An error occurred';
    }
};

export const getProfile = async () => {
    try {
        const response = await api.get('/auth/profile');
        return response.data;
    } catch (error) {
        throw (error as unknown as { response?: { data: unknown } }).response?.data || 'An error occurred';
    }
};
