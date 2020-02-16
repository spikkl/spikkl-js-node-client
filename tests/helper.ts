import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { toStringMap } from '../src/util';
import { StringMap } from '../../spikkl-js-client/lib/agent';
import { ResourceRequest } from '../src/resource';

export const defaultRequest: ResourceRequest = Object.freeze({
    query: {},
});

export const defaultResponse = Object.freeze({
    status: 200,
    data: {},
    url: 'https://api.spikkl.nl/',
});

export const defaultConfig = Object.freeze({
    apiKey: 'valid_api_key',
});

/**
 * Fixture interface
 *
 * Represents the essential data returned by the API.
 */
interface Fixture {
    statusText: string;
    url: string;
    query?: StringMap;
    headers?: StringMap;
    method?: string;
    data?: any;
    status: number;
}

export const toResponse = (fixture: Fixture, httpRequest?: ResourceRequest): AxiosResponse => {
    const { status, headers, data, statusText } = fixture;

    return {
        status,
        statusText,
        headers: toStringMap(headers),
        data,
        config: {},
        request: httpRequest ? httpRequest : toRequest(fixture),
    };
};

export const toRequest = (fixture: Fixture): ResourceRequest => {
    const { query } = fixture;

    return {
        query: toStringMap(query),
    };
};
