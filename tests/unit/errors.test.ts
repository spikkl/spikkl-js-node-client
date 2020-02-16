import { AxiosResponse } from 'axios';
import {
    AccessDeniedError,
    AccessRestrictedError,
    ApiError,
    BadRequestError,
    InvalidApiKeyError,
    InvalidRequestError,
    OutOfRangeError,
    PageNotFoundError,
    parse,
    QuotaReachedError,
    ResponseError,
    RevokedApiKeyError,
    ServerError,
    UnauthorizedError,
    ZeroResultsError,
} from '../../src/errors';
import { toResponse, defaultRequest, defaultResponse } from '../helper';
import { errors, locations } from '../fixtures';

describe('errors', () => {
    describe('ApiError', () => {
        let error: ApiError;
        let message: string;
        let httpStatus: number;

        beforeEach(() => {
            message = 'Error occurred';
            httpStatus = 400;
            error = new ApiError({ message, httpStatus });
        });

        it('assigns instance variables', () => {
            expect(error.message).toBe(message);
            expect(error.httpStatus).toBe(httpStatus);
            expect(error.name).toBe('API Error');
        });

        it('interacts correctly with instance of', () => {
            expect(error instanceof Error).toBeTruthy();
            expect(error instanceof ApiError).toBeTruthy();
        });

        it('accepts optional metadata parameter', () => {
            const metadata = { foo: 'bar', bas: {} };
            const errorWithMeta = new ApiError({ message, httpStatus, metadata });

            expect(errorWithMeta.metadata).toBe(metadata);
        });

        it('instantiates with empty metadata object', () => {
            expect(error.metadata).toStrictEqual({});
        });
    });

    interface SuiteOptions {
        errorClass: { new (httpResponse: AxiosResponse): ResponseError };
        httpResponse: AxiosResponse;
    }

    const ApiErrorSuite = (options: SuiteOptions) => {
        const { httpResponse, errorClass } = options;
        const error = new errorClass(httpResponse);

        it('assigns instance variables', () => {
            expect(error.response).toBe(httpResponse);
            expect(error.message).toBe(httpResponse.data.status_code);
            expect(error.httpStatus).toBe(httpResponse.status);
            expect(error.metadata).toStrictEqual({});
            expect(error.name).toBe('API Error');
        });

        it('interacts correctly with instance of', () => {
            expect(error instanceof Error).toBeTruthy();
            expect(error instanceof ApiError).toBeTruthy();
            expect(error instanceof ResponseError).toBeTruthy();
            expect(error instanceof errorClass).toBeTruthy();
        });
    };

    describe('ResponseError', () => {
        ApiErrorSuite({
            httpResponse: toResponse(errors.invalidApiKey),
            errorClass: ResponseError,
        });
    });

    describe('BadRequestError', () => {
        const httpResponse = {
            status: 400,
            statusText: 'Bad Request',
            httpRequest: defaultRequest,
            headers: {},
            config: {},
            data: {},
        };

        ApiErrorSuite({ httpResponse, errorClass: BadRequestError });
    });

    describe('UnauthorizedError', () => {
        const httpResponse = {
            status: 401,
            statusText: 'Unauthorized',
            httpRequest: defaultRequest,
            headers: {},
            config: {},
            data: {},
        };

        ApiErrorSuite({ httpResponse, errorClass: UnauthorizedError });
    });

    describe('AccessDeniedError', () => {
        const httpResponse = {
            status: 401,
            statusText: 'Access Denied',
            httpRequest: defaultRequest,
            headers: {},
            config: {},
            data: {},
        };

        ApiErrorSuite({ httpResponse, errorClass: AccessDeniedError });
    });

    describe('BadRequestError', () => {
        const httpResponse = {
            status: 500,
            statusText: 'Server Error',
            httpRequest: defaultRequest,
            headers: {},
            config: {},
            data: {},
        };

        ApiErrorSuite({ httpResponse, errorClass: ServerError });
    });

    describe('PageNotFoundError', () => {
        ApiErrorSuite({
            httpResponse: toResponse(errors.pageNotFound),
            errorClass: PageNotFoundError,
        });
    });

    describe('ZeroResultsError', () => {
        ApiErrorSuite({
            httpResponse: toResponse(locations.notFound),
            errorClass: ZeroResultsError,
        });
    });

    describe('AccessRestrictedError', () => {
        ApiErrorSuite({
            httpResponse: toResponse(errors.accessRestricted),
            errorClass: AccessRestrictedError,
        });
    });

    describe('InvalidApiKeyError', () => {
        ApiErrorSuite({
            httpResponse: toResponse(errors.invalidApiKey),
            errorClass: InvalidApiKeyError,
        });
    });

    describe('RevokedApiKeyError', () => {
        ApiErrorSuite({
            httpResponse: toResponse(errors.revokedApiKey),
            errorClass: RevokedApiKeyError,
        });
    });

    describe('QuotaReachedError', () => {
        ApiErrorSuite({
            httpResponse: toResponse(errors.quotaReached),
            errorClass: QuotaReachedError,
        });
    });

    describe('OutOfRangeError', () => {
        ApiErrorSuite({
            httpResponse: toResponse(locations.outOfRange),
            errorClass: OutOfRangeError,
        });
    });

    describe('InvalidRequestError', () => {
        ApiErrorSuite({
            httpResponse: toResponse(locations.invalidRequest),
            errorClass: InvalidRequestError,
        });
    });

    describe('#parse', () => {
        it('returns ZeroResultsError', () => {
            const { data, status } = locations.notFound;
            const response = {
                ...defaultResponse,
                ...{ status, data },
            };

            const error = parse(response);
            expect(error).toBeInstanceOf(ZeroResultsError);
        });

        it('returns InvalidApiKeyError', () => {
            const { data, status } = errors.invalidApiKey;
            const response = {
                ...defaultResponse,
                ...{ status, data },
            };

            const error = parse(response);
            expect(error).toBeInstanceOf(InvalidApiKeyError);
        });

        it('returns AccessRestrictedError', () => {
            const { data, status } = errors.accessRestricted;
            const response = {
                ...defaultResponse,
                ...{ status, data },
            };

            const error = parse(response);
            expect(error).toBeInstanceOf(AccessRestrictedError);
        });

        it('returns RevokedApiKeyError', () => {
            const { data, status } = errors.revokedApiKey;
            const response = {
                ...defaultResponse,
                ...{ status, data },
            };

            const error = parse(response);
            expect(error).toBeInstanceOf(RevokedApiKeyError);
        });

        it('returns QuotaReachedError', () => {
            const { data, status } = errors.quotaReached;
            const response = {
                ...defaultResponse,
                ...{ status, data },
            };

            const error = parse(response);
            expect(error).toBeInstanceOf(QuotaReachedError);
        });

        it('returns OutOfRangeError', () => {
            const { data, status } = locations.outOfRange;
            const response = {
                ...defaultResponse,
                ...{ status, data },
            };

            const error = parse(response);
            expect(error).toBeInstanceOf(OutOfRangeError);
        });

        it('returns InvalidRequestError', () => {
            const { data, status } = locations.invalidRequest;
            const response = {
                ...defaultResponse,
                ...{ status, data },
            };

            const error = parse(response);
            expect(error).toBeInstanceOf(InvalidRequestError);
        });

        it('returns BadRequestError', () => {
            const data = {};
            const status = 400;
            const response = {
                ...defaultResponse,
                ...{ status, data },
            };

            const error = parse(response);
            expect(error).toBeInstanceOf(BadRequestError);

            expect(error.httpStatus).toBe(status);
            expect(error.message).toBeUndefined();
        });

        it('returns UnauthorizedError', () => {
            const data = {};
            const status = 401;
            const response = {
                ...defaultResponse,
                ...{ status, data },
            };

            const error = parse(response);
            expect(error).toBeInstanceOf(UnauthorizedError);

            expect(error.httpStatus).toBe(status);
            expect(error.message).toBeUndefined();
        });

        it('returns AccessDeniedError', () => {
            const data = {};
            const status = 403;
            const response = {
                ...defaultResponse,
                ...{ status, data },
            };

            const error = parse(response);
            expect(error).toBeInstanceOf(AccessDeniedError);

            expect(error.httpStatus).toBe(status);
            expect(error.message).toBeUndefined();
        });

        it('returns PageNotFoundError', () => {
            const data = {};
            const status = 404;
            const response = {
                ...defaultResponse,
                ...{ status, data },
            };

            const error = parse(response);
            expect(error).toBeInstanceOf(PageNotFoundError);

            expect(error.httpStatus).toBe(status);
            expect(error.message).toBeUndefined();
        });

        it('returns ServerError', () => {
            const data = {};
            const status = 500;
            const response = {
                ...defaultResponse,
                ...{ status, data },
            };

            const error = parse(response);
            expect(error).toBeInstanceOf(ServerError);

            expect(error.httpStatus).toBe(status);
            expect(error.message).toBeUndefined();
        });

        it('returns a generic error if body is not a json object', () => {
            const data = 'some_body';
            const status = 888;
            const response = {
                ...defaultResponse,
                ...{ status, data },
            };

            const error = parse(response);
            expect(error).toBeInstanceOf(ApiError);

            expect(error.httpStatus).toBe(status);
            expect(error.message).toBe(JSON.stringify(data));
        });

        it('returns a generic error if message is malformed', () => {
            const data = { status_code: 404 };
            const status = 888;
            const response = {
                ...defaultResponse,
                ...{ status, data },
            };

            const error = parse(response);
            expect(error).toBeInstanceOf(ApiError);

            expect(error.httpStatus).toBe(status);
        });

        it('returns a generic error if status is malformed', () => {
            const data = { status: 'not_failed' };
            const status = 888;
            const response = {
                ...defaultResponse,
                ...{ status, data },
            };

            const error = parse(response);
            expect(error).toBeInstanceOf(ApiError);
        });

        it('returns a generic error for empty response body', () => {
            const data = null;
            const status = 404;
            const response = {
                ...defaultResponse,
                ...{ status, data },
            };

            const error = parse(response);
            expect(error).toBeInstanceOf(ApiError);
        });

        it('returns undefined for a 200 response', () => {
            const response = { ...defaultResponse };

            const error = parse(response);
            expect(error).toBeUndefined();
        });

        it('returns undefined for a 2xx response', () => {
            const response = {
                ...defaultResponse,
                ...{ status: 299 },
            };

            const error = parse(response);
            expect(error).toBeUndefined();
        });

        it('returns error for < 200 response', () => {
            const response = {
                ...defaultResponse,
                ...{ status: 199 },
            };

            const error = parse(response);
            expect(error).toBeInstanceOf(ApiError);
        });

        it('returns error for > 300 response', () => {
            const response = {
                ...defaultResponse,
                ...{ status: 301 },
            };

            const error = parse(response);
            expect(error).toBeInstanceOf(ApiError);
        });
    });
});
