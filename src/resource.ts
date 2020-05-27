import qs from 'qs';
import { AxiosInstance, AxiosResponse } from 'axios';
import { OptionalStringMap } from './types';
import { parse } from './errors';

/**
 * ResourceOptions interface
 */
export interface ResourceOptions {
    resource: string;
    format: string;
    client: AxiosInstance;
}

/**
 * ResourceRequest interface
 */
export interface ResourceRequest {
    query?: OptionalStringMap;
    headers?: OptionalStringMap;
}

/**
 * ResourceResponseMeta interface
 */
interface ResourceResponseMeta {
    timestamp: number;
    trace_id: string;
}

/**
 * ResourceResponseData interface
 */
export interface ResourceResponseData {
    meta: ResourceResponseMeta;
    status: string;
    status_code: string;
    results: any[];
}

/**
 * ResourceResponse interface
 */
export interface ResourceResponse<res> extends AxiosResponse {
    data: res;
}

/**
 * ResourceList interface
 */
export interface ResourceList<req, res> {
    (countryCode: string, request: req): Promise<ResourceResponse<res>>;
}

/**
 * List the location resources with the given query parameters.
 *
 * @param {ResourceOptions} options
 *
 * @return {ResourceResponse}
 */
export const list = <req extends ResourceRequest, res extends ResourceResponseData>(options: ResourceOptions): ResourceList<req, res> => {
    const { client, resource, format } = options;

    return (countryCode: string, request: req): Promise<ResourceResponse<res>> => {
        return client
            .get(`geo/${countryCode}/${resource}.${format}${qs.stringify(request.query, { addQueryPrefix: true })}`)
            .then((response: ResourceResponse<res>) => {
                const error = parse(response);

                if (error) {
                    throw error;
                }

                return response;
            })
            .catch(error => {
                throw parse(error.response);
            });
    };
};
