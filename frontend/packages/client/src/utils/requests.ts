export async function request<T>(url: string, options?: Partial<Request>): Promise<T> {
    const headers = options?.headers ?? new Headers();
    headers.append('Content-Type', 'application/json');

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (!response.ok) {
        let errorText = '';
        let errorObj = { message: '' };

        try {
            errorObj = await response.json();
        } catch {
            errorText = await response.text();
        }
        throw new Error(errorObj.message ?? errorText)
    }

    return await response.json() as T;
}

export async function get<T>(url: string, options?: Partial<Request>): Promise<T> {
    return await request(url, {
        ...options,
        method: 'GET',
    });
}

export async function post<T>(url: string, options?: Partial<Request>): Promise<T> {
    return await request(url, {
        ...options,
        method: 'POST',
    });
}