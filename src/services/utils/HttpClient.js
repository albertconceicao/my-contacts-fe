import { APIError } from '../../errors/APIError';
import delay from '../../utils/delay';

class HttpClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    get(path, options) {
        return this.makeRequest(path, {
            method: 'GET',
            headers: options?.headers,
        });
    }

    post(path, options) {
        return this.makeRequest(path, {
            method: 'POST',
            body: options?.body,
            headers: options?.headers,
        });
    }

    put(path, options) {
        return this.makeRequest(path, {
            method: 'PUT',
            body: options?.body,
            headers: options?.headers,
        });
    }

    delete(path, options) {
        return this.makeRequest(path, {
            method: 'DELETE',
            body: options?.body,
            headers: options?.headers,
        });
    }

    async makeRequest(path, options) {
        await delay(500);

        const headers = new Headers();

        if (options.body) {
            headers.append('Content-Type', 'application/json');
        }

        if (options.headers) {
            Object.entries(options.headers).forEach(([name, value]) => {
                headers.append(name, value);
            });
        }
        const response = await fetch(`${this.baseUrl}${path}`, {
            method: options.method,
            body: JSON.stringify(options.body),
            headers,
        });

        let respondeBody = null;

        const contentType = response.headers.get('Content-Type');
        if (contentType?.includes('application/json')) {
            respondeBody = await response.json();
        }

        if (response.ok) {
            return respondeBody;
        }

        throw new APIError(response, respondeBody);
    }
}

export default HttpClient;