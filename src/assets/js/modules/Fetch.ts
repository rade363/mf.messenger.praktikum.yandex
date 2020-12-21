import queryString from "./queryString.js";

const METHODS: IMethodsList = {
    GET: "GET",
    PUT: "PUT",
    POST: "POST",
    DELETE: "DELETE"
};

export default class HTTPTransport {
    GET(url: string, options: IRequestOptions = {}): Promise<unknown> {
        return this.request(url, {...options, method: METHODS.GET}, options.timeout);
    };

    POST(url: string, options: IRequestOptions = {}): Promise<unknown> {
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };

    PUT(url: string, options: IRequestOptions = {}): Promise<unknown> {
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    };

    DELETE(url: string, options: IRequestOptions = {}): Promise<unknown> {
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };

    request(url: string, options: IFetchRequestOptions, timeout: number = 5000): Promise<unknown> {
        const {method, headers, data} = options;
        const realUrl = method === METHODS.GET && data !== undefined ? `${url}${queryString(data)}` : url;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(method, realUrl);

            xhr.timeout = timeout;

            if (headers) {
                Object
                    .entries(headers)
                    .forEach(([key, value]) => xhr.setRequestHeader(key, value));
            }

            xhr.onload = function() {
                resolve(xhr)
            };

            function handleError(err: ProgressEvent) {
                reject(err);
            }

            xhr.onabort = handleError;
            xhr.onerror = handleError;
            xhr.ontimeout = handleError;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}

export function fetchWithRetry(url: string, options: IFetchWithRetryOptions): Promise<unknown> | never {
    const {retries, method} = options;
    const ownFetch = new HTTPTransport();
    const func = ownFetch[method];
    if (retries === undefined) {
        return func(url, options);
    }
    return func(url, options)
        .catch((err: string) => {
            if (retries - 1 > 0) {
                const newOptions = {
                    ...options,
                    retries: retries - 1
                };
                return fetchWithRetry(url, newOptions);
            }
            return Promise.reject(new Error(err));
        });
}