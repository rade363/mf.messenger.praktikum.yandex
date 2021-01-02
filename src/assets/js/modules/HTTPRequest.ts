import queryString from "./queryString.js";

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

    GET(url: string, options: IRequestOptions = {}): Promise<XMLHttpRequest> {
        return this.request(url, {...options, method: METHODS.GET}, options.timeout);
    };

    POST(url: string, options: IRequestOptions = {}): Promise<XMLHttpRequest> {
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };

    PUT(url: string, options: IRequestOptions = {}): Promise<XMLHttpRequest> {
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    };

    DELETE(url: string, options: IRequestOptions = {}): Promise<XMLHttpRequest> {
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };

    get = this.GET;
    post = this.POST;
    put = this.PUT;
    delete = this.DELETE;

    request(url: string, options: IFetchRequestOptions, timeout: number = 5000): Promise<XMLHttpRequest> {
        const {method, headers, data} = options;
        const realUrl = method === METHODS.GET && data !== undefined ? `${url}?${queryString(data)}` : url;
        const fullUrl = `${this.baseUrl}${realUrl}`;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(method, fullUrl);

            xhr.timeout = timeout;
            xhr.withCredentials = true;

            const allHeaders = headers ? { ...this.defaultHeaders, ...headers } : this.defaultHeaders;
            Object
                .entries(allHeaders)
                .forEach(([key, value]) => xhr.setRequestHeader(key, value));

            xhr.onload = function() {
                if (`${xhr.status}`[0] === "2") {
                    resolve(xhr)
                    return;
                }
                reject(xhr);
            };

            function handleError(err: ProgressEvent) {
                reject(err);
            }

            xhr.onabort = handleError;
            xhr.onerror = handleError;
            xhr.ontimeout = handleError;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else if (data instanceof FormData) {
                xhr.send(data);
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}

export function fetchWithRetry(url: string, options: IFetchWithRetryOptions): Promise<XMLHttpRequest> | never {
    const {retries, method} = options;
    const request = new HTTPRequest();
    const requestMethod = request[method];
    if (retries === undefined) {
        return requestMethod(url, options);
    }
    return requestMethod(url, options)
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