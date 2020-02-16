import { ResourceResponse, ResourceResponseData } from './resource';

/**
 * Metadata object which stores meta data
 * specific to the concrete client implementation.
 */
interface Metadata {
    [k: string]: unknown;
}

/**
 * Error options which require the HTTP status
 * only from a failed request.
 */
interface ApiErrorOptions {
    message: string;
    httpStatus: number;
    metadata?: Metadata;
}

/**
 * Base error calls for all API responses.
 */
export class ApiError extends Error {
    public httpStatus: number;
    public metadata: Metadata;

    constructor(options: ApiErrorOptions) {
        super();

        const { message, httpStatus, metadata = {} } = options;

        this.name = 'API Error';

        this.message = message;
        this.httpStatus = httpStatus;
        this.metadata = metadata;
    }
}

/**
 * Response Error
 *
 * Error class for API response with a JSON body.
 */
export class ResponseError extends ApiError {
    /**
     * Raw HTTP response
     */
    public response: ResourceResponse<ResourceResponseData>;

    /**
     * Returns an API error instance.
     *
     * @param httpResponse
     */
    constructor(httpResponse: ResourceResponse<ResourceResponseData>) {
        super({
            httpStatus: httpResponse.status,
            message: httpResponse.data.status_code,
        });

        this.response = httpResponse;
    }
}

/**
 * AccessDeniedError
 *
 * Captures API responses that return 401 (Unauthorized) response
 */
export class UnauthorizedError extends ResponseError {}

/**
 * AccessDeniedError
 *
 * Captures API responses that return 403 (Access Denied) response
 */
export class AccessDeniedError extends ResponseError {}

/**
 * InvalidApiKeyError
 *
 * Invalid API key presented for the request.
 */
export class InvalidApiKeyError extends UnauthorizedError {}

/**
 * AccessRestrictedError
 *
 * The api key used is restricted for the current host.
 */
export class AccessRestrictedError extends AccessDeniedError {}

/**
 * RevokedApiKeyError
 *
 * Revoked API key presented to the request.
 */
export class RevokedApiKeyError extends AccessDeniedError {}

/**
 * ZeroResultsError
 *
 * Captures API responses that return a 404 (Zero Results) response.
 */
export class ZeroResultsError extends ResponseError {}

/**
 * PageNotFoundError
 *
 * Captures API responses that return a 404 (Page Not Found) response.
 */
export class PageNotFoundError extends ResponseError {}

/**
 * BadRequestError
 *
 * Captures API responses that return a 400 (Invalid) response.
 */
export class BadRequestError extends ResponseError {}

/**
 * InvalidRequestError
 *
 * Invalid search parameter, tag, or syntax submitted.
 */
export class InvalidRequestError extends BadRequestError {}

/**
 * OutOfRangeError
 *
 * The provided search query does not correspond with the provided country code.
 */
export class OutOfRangeError extends BadRequestError {}

/**
 * ServerError
 *
 * Captures API responses that return a 500 (Server Error) response.
 */
export class ServerError extends ResponseError {}

/**
 * QuotaReachedError
 *
 * Quota limits reached. One of your limits has been reached today.
 */
export class QuotaReachedError extends ResponseError {}

/**
 * Determine if the response is successful.
 *
 * @param {number} code
 *
 * @return {Boolean}
 */
const isSuccessful = (code: number): boolean => {
    return code >= 200 && code < 300;
};

/**
 * Determine if the given value is an object.
 *
 * @param {*} object
 *
 * @return {Boolean}
 */
const isObject = (object: unknown): object is object => {
    if (object === null) {
        return false;
    }

    return typeof object === 'object';
};

const isErrorApiResponse = (data: ResourceResponseData): data is ResourceResponseData => {
    return data.status_code && data.status && data.status === 'failed';
};

const ACCESS_RESTRICTED_STATUS = 'ACCESS_RESTRICTED';
const INVALID_API_KEY_STATUS = 'INVALID_API_KEY';
const REVOKED_API_KEY_STATUS = 'REVOKED_API_KEY';
const INVALID_REQUEST_STATUS = 'INVALID_REQUEST';
const OUT_OF_RANGE_STATUS = 'OUT_OF_RANGE';
const QUOTA_REACHED_STATUS = 'QUOTA_REACHED';
const ZERO_RESULTS_STATUS = 'ZERO_RESULTS';

/**
 * Parse the response and handle the error.
 *
 * @param {ResourceResponse} response
 *
 * @return {Error|void}
 */
export const parse = (response: ResourceResponse<ResourceResponseData>): Error | void => {
    const { status, data } = response;

    if (isSuccessful(status)) {
        return;
    }

    if (isObject(data) && isErrorApiResponse(data)) {
        switch (data.status_code) {
            case ACCESS_RESTRICTED_STATUS:
                return new AccessRestrictedError(response);

            case INVALID_API_KEY_STATUS:
                return new InvalidApiKeyError(response);

            case REVOKED_API_KEY_STATUS:
                return new RevokedApiKeyError(response);

            case ZERO_RESULTS_STATUS:
                return new ZeroResultsError(response);

            case QUOTA_REACHED_STATUS:
                return new QuotaReachedError(response);

            case OUT_OF_RANGE_STATUS:
                return new OutOfRangeError(response);

            case INVALID_REQUEST_STATUS:
                return new InvalidRequestError(response);
        }
    }

    if (isObject(data)) {
        switch (status) {
            case 400:
                return new BadRequestError(response);

            case 401:
                return new UnauthorizedError(response);

            case 403:
                return new AccessDeniedError(response);

            case 404:
                return new PageNotFoundError(response);

            case 500:
                return new ServerError(response);
        }
    }

    return new ApiError({ httpStatus: status, message: JSON.stringify(data) });
};
