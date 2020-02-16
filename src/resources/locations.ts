import { AxiosInstance } from 'axios';
import { OptionalStringMap, Location } from '../types';
import { list, ResourceResponse, ResourceResponseData } from '../resource';

/**
 * LookupLocationOptions interface
 */
export interface LookupLocationOptions {
    postalCode: string;
    streetNumber?: string;
    streetNumberSuffix?: string;
}

/**
 * ReverseLookupLocationOptions interface
 */
export interface ReverseLookupLocationOptions {
    longitude: string;
    latitude: string;
}

/**
 * LocationRequest interface
 */
export interface LocationRequest {
    query?: OptionalStringMap;
}

/**
 * LocationResponseData interface
 */
export interface LocationResponseData extends ResourceResponseData {
    results: Location[];
}

/**
 * LocationResource interface
 */
export interface LocationResource {
    lookup(countryCode: string, request: LocationRequest): Promise<ResourceResponse<LocationResponseData>>;
    reverse(countryCode: string, request: LocationRequest): Promise<ResourceResponse<LocationResponseData>>;
}

/**
 * Create a new resource to lookup the locations.
 *
 * @param {AxiosInstance} client
 */
export const create = (client: AxiosInstance): LocationResource => {
    const lookup = list({ resource: 'lookup', format: 'json', client });
    const reverse = list({ resource: 'reverse', format: 'json', client });

    return { lookup, reverse };
};
