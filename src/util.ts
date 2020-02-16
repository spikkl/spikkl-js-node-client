import { Authenticable, Filterable, StringMap, OptionalStringMap } from './types';

/**
 * Determine if the given value is a string.
 *
 * @param {*} i
 */
const isString = (i: any): i is string => typeof i === 'string';

/**
 * Emit undefined value for the string map.
 *
 * @param {OptionalStringMap} optional
 *
 * @return {StringMap}
 */
export const toStringMap = (optional?: OptionalStringMap): StringMap => {
    if (optional === undefined) {
        return {};
    }

    return Object.keys(optional).reduce<StringMap>((result, key) => {
        const value = optional[key];

        if (isString(value)) {
            result[key] = value;
        }

        return result;
    }, {});
};

/**
 * AppendApiKeyOptions interface
 */
interface AppendApiKeyOptions {
    query: StringMap;
    options: Authenticable;
}

/**
 * Add the api key to the query.
 *
 * @param {StringMap} query
 * @param {Authenticable} options
 *
 * @return {StringMap}
 */
export const appendApiKey = ({ query, options }: AppendApiKeyOptions): StringMap => {
    query.key = options.apiKey;

    return query;
};

/**
 * AppendFilterOptions interface
 */
interface AppendFilterOptions {
    query: StringMap;
    options: Filterable;
}

/**
 * Add filters to the query.
 *
 * @param {StringMap} query
 * @param {Filterable} options
 *
 * @return {StringMap}
 */
export const appendFilter = ({ query, options }: AppendFilterOptions): StringMap => {
    const { filter } = options;

    if (filter !== undefined) {
        query.filter = filter.join(',');
    }

    return query;
};
