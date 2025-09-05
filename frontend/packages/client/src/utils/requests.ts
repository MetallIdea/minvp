export type RequestParams<T> = {
    method: 'GET' | 'POST' | 'DELETE';
    query: any;
    body: T;
    headers: Record<string, any>;
}

export async function request<R, T>(url: string, options?: Partial<RequestParams<R>>): Promise<T> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    Object.entries(options?.headers ?? {}).forEach(([name, value]) => {
        if (value) {
            headers.append(name, value);
        }
    })

    const urlParams = new URLSearchParams();

    Object.entries(options?.query ?? {}).forEach(([name, value]) => {
        if (value) {
            urlParams.append(name, value.toString());
        }
    })

    const response = await fetch(`${url}?${urlParams}`, {
        body: options?.body ? JSON.stringify(options?.body) : undefined,
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

export async function get<T>(url: string, options?: Partial<RequestParams<any>>): Promise<T> {
    return await request(url, {
        ...options,
        method: 'GET',
    });
}

export async function post<T, R>(url: string, options?: Partial<RequestParams<R>>): Promise<T> {
    return await request(url, {
        ...options,
        method: 'POST',
    });
}