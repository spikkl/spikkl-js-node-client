import https from 'https';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { cloneDeep } from 'lodash';

// Lib
import { version as sdkVersion } from '../package.json';
import { Authenticable, ClientInstance, Filterable, StringMap, Location } from './types';
import { appendApiKey, appendFilter, toStringMap } from './util';

// Resources
import { ResourceRequest } from './resource';
import { create as createLocationResource, LookupLocationOptions, ReverseLookupLocationOptions } from './resources/locations';
import { ZeroResultsError } from './errors';

export interface SpikklOptions extends AxiosRequestConfig, Authenticable, Filterable {}

function createHttpClient(options: SpikklOptions): AxiosInstance {
    const axiosOptions: SpikklOptions = cloneDeep(options);

    delete axiosOptions.apiKey;

    axiosOptions.baseURL = 'https://api.spikkl.nl/';

    if (axiosOptions.headers === undefined) {
        axiosOptions.headers = {};
    }

    axiosOptions.headers['Accept-Encoding'] = 'gzip';
    axiosOptions.headers['Accept'] = 'application/json';
    axiosOptions.headers['Content-Type'] = 'application/json';
    axiosOptions.headers['User-Agent'] = [`Node/${process.version}`, `Spikkl/${sdkVersion}`].join(';');

    axiosOptions.httpsAgent = new https.Agent({});

    return axios.create(axiosOptions);
}

export default function createSpikklClient(options: SpikklOptions): ClientInstance {
    if (!options.apiKey) {
        throw new TypeError('Missing parameters "apiKey"');
    }

    const httpClient = createHttpClient(options);

    // Resources
    const locationResource = createLocationResource(httpClient);

    return {
        lookup: (lookupOptions: LookupLocationOptions): Promise<Location[]> => {
            const query: StringMap = toStringMap({
                postal_code: lookupOptions.postalCode,
                street_number: lookupOptions.streetNumber.toString(),
                street_number_suffix: lookupOptions.streetNumberSuffix,
            });

            appendApiKey({ query, options });
            appendFilter({ query, options });

            const request: ResourceRequest = { query };

            return locationResource
                .lookup('nld', request)
                .then(response => response.data.results)
                .catch(error => {
                    if (error instanceof ZeroResultsError) {
                        return [];
                    }

                    throw error;
                });
        },

        reverse: (lookupOptions: ReverseLookupLocationOptions): Promise<Location[]> => {
            const query: StringMap = toStringMap({
                longitude: lookupOptions.longitude.toString(),
                latitude: lookupOptions.latitude.toString(),
            });

            appendApiKey({ query, options });
            appendFilter({ query, options });

            const request: ResourceRequest = { query };

            return locationResource
                .reverse('nld', request)
                .then(response => response.data.results)
                .catch(error => {
                    if (error instanceof ZeroResultsError) {
                        return [];
                    }

                    throw error;
                });
        },
    };
};

export { createHttpClient };
export { createSpikklClient };