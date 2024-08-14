const API_URL = import.meta.env.VITE_API_URL;

// Type pour les options de la requête API
interface ApiRequestOptions {
    endpoint: string;
    method?: string;
    data?: unknown;
}

// Fonction API avec accès à Redux pour obtenir le token
export async function apiRequest(
    {endpoint, method = 'GET', data}: ApiRequestOptions,
    token: string | null
): Promise<Response> {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const options: RequestInit = {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
    };

    const url = `${API_URL}${endpoint}`;
    const response = await fetch(url, options);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
    }

    return response;
}
