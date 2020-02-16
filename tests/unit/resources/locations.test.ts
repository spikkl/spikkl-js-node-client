import axios from 'axios';
import mockAdapter from 'axios-mock-adapter';

import { create as createLocationResource } from '../../../src/resources/locations';
import { errors, locations } from '../../fixtures';
import { QuotaReachedError, ResponseError } from '../../../src/errors';

const mock = new mockAdapter(axios);

describe('locations', () => {
    let resource;
    beforeEach(() => {
        resource = createLocationResource(axios.create());
    });

    const apiKey = 'some_api_key';
    const postalCode = '2611HB';
    const query = { key: apiKey, query: postalCode };

    it('generates API request on client', done => {
        mock.onGet('geo/nld/lookup.json?key=some_api_key&query=2611HB').reply(200, {});

        resource
            .lookup('nld', { query })
            .then(result => {
                expect(result.status).toBe(200);
                done();
            })
            .catch(error => {
                expect(error).toBeUndefined();
                done();
            });
    });

    it('returns location data', done => {
        mock.onGet('geo/nld/lookup.json?key=some_api_key&query=2611HB').reply(200, locations.success.body);

        resource
            .lookup('nld', { query })
            .then(result => {
                expect(result.data).toStrictEqual(locations.success.body);
                done();
            })
            .catch(error => {
                expect(error).toBeUndefined();
                done();
            });
    });

    it('returns non API errors', done => {
        mock.onGet('geo/nld/lookup.json?key=some_api_key&query=2611HB').timeout();

        resource
            .lookup('nld', { query })
            .then(() => done(new Error('Promise should be rejected')))
            .catch(error => {
                expect(error).toBeInstanceOf(Error);
                done();
            });
    });

    it('returns API errors', done => {
        mock.onGet('geo/nld/lookup.json?key=some_api_key&query=2611HB').reply(errors.quotaReached.status, errors.quotaReached.data);

        resource
            .lookup('nld', { query })
            .then(() => done(new Error('Promise should be rejected')))
            .catch(error => {
                expect(error).toBeInstanceOf(ResponseError);
                expect(error).toBeInstanceOf(QuotaReachedError);
                done();
            });
    });
});
