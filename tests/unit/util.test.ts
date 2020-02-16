import { appendApiKey, appendFilter, toStringMap } from '../../src/util';
import { LocationKeys } from '../../src/types';

describe('util', () => {
    describe('#toStringMap', () => {
        it('shallow clones an object omitting no string values', () => {
            expect(toStringMap({ foo: 'bar', bas: undefined })).toEqual({ foo: 'bar' });
        });

        it('returns empty object if undefined', () => {
            expect(toStringMap({})).toEqual({});
        });
    });

    describe('#appendApiKey', () => {
        it('appends api key to query object', () => {
            const query = {};

            const options = { apiKey: 'some_api_key' };
            const result = appendApiKey({ query, options });

            expect(query).toEqual(result);
            expect(result.key).toBe('some_api_key');
        });
    });

    describe('#appendFilter', () => {
        it('appends filter to query object', () => {
            const query = {};
            const filter = ['line_1', 'postal_code'] as LocationKeys[];

            const options = { filter };
            const result = appendFilter({ query, options });

            expect(query).toEqual(result);
            expect(result.filter).toBe('line_1,postal_code');
        });
    });
});
