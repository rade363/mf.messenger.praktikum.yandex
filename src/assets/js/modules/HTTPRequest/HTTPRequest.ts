import queryString from "../queryString";

const METHODS: IMethodsList = {
    GET: "GET",
    PUT: "PUT",
    POST: "POST",
    DELETE: "DELETE"
};

export default class HTTPRequest {
    baseUrl: string;

    defaultHeaders: IRequestHeaders = {};

    constructor(defaultOptions?: IDefaultOptions) {
        if (defaultOptions) {
            if (defaultOptions.url) {
                this.baseUrl = defaultOptions.url;
            }
            if (defaultOptions.headers) {
                this.defaultHeaders = defaultOptions.headers;
            }
        }
    }

    GET(url: string, options: IRequestOptions = {}): Promise<any> {
        return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
    }

    POST(url: string, options: IRequestOptions = {}): Promise<any> {
        return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
    }

    PUT(url: string, options: IRequestOptions = {}): Promise<any> {
        return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
    }

    DELETE(url: string, options: IRequestOptions = {}): Promise<any> {
        return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
    }

    get = this.GET;

    post = this.POST;

    put = this.PUT;

    delete = this.DELETE;

    request(url: string, options: IFetchRequestOptions, timeout = 5000): Promise<any> {
        const { method, headers, data } = options;
        const realUrl = method === METHODS.GET && data !== undefined ? `${url}?${queryString(data)}` : url;
        const fullUrl = `${this.baseUrl}${realUrl}`;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(method, fullUrl);

            xhr.timeout = timeout;
            xhr.withCredentials = true;

            const allHeaders = headers ? { ...this.defaultHeaders, ...headers } : this.defaultHeaders;
            const lowercaseHeaders = Object.entries(allHeaders).reduce((acc: TObjectType, [key, value]) => {
                acc[key.toLowerCase()] = value;
                return acc;
            }, {});
            Object.entries(allHeaders).forEach(([key, value]) => xhr.setRequestHeader(key, value));

            function handleResponse() {
                if (`${xhr.status}`[0] === "2") {
                    try {
                        const parsedResponse = JSON.parse(xhr.response);
                        resolve(parsedResponse);
                    } catch {
                        resolve(xhr.response);
                    }
                    return;
                }
                reject(xhr);
            }

            function handleError(err: ProgressEvent) {
                reject(err);
            }

            xhr.onload = handleResponse;
            xhr.onabort = handleError;
            xhr.onerror = handleError;
            xhr.ontimeout = handleError;

            if (method === METHODS.GET || !data) {
                if (!lowercaseHeaders["content-type"]) {
                    xhr.setRequestHeader("Content-Type", "application/json");
                }
                xhr.send();
            } else if (data instanceof FormData) {
                // If uncommented, code below throws an error for some reason related to Access-Control-Allow-Origin. Probably something related to back-end?
                // Access to XMLHttpRequest at 'https://ya-praktikum.tech/api/v2/user/profile/avatar' from origin 'http://localhost:4000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
                // if (!lowercaseHeaders["content-type"]) {
                //     xhr.setRequestHeader("Content-Type", "multipart/form-data")
                // }
                xhr.send(data);
            } else {
                if (!lowercaseHeaders["content-type"]) {
                    xhr.setRequestHeader("Content-Type", "application/json");
                }
                xhr.send(JSON.stringify(data));
            }
        });
    }
}

export function fetchWithRetry(url: string, options: IFetchWithRetryOptions): Promise<any> | never {
    const { retries, method } = options;
    const request = new HTTPRequest();
    const requestMethod = request[method];
    if (retries === undefined) {
        return requestMethod(url, options);
    }
    return requestMethod(url, options).catch((err: string) => {
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
