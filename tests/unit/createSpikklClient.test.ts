import axios from 'axios';
import createSpikklClient from '../..';

import mockAdapter from 'axios-mock-adapter';
import { defaultConfig } from '../helper';
import { errors, locations } from '../fixtures';

const mock = new mockAdapter(axios);

describe('createSpikklClient', () => {
    it('throws error without api key', () => {
        expect(() => createSpikklClient(undefined)).toThrowError(TypeError);
    });

    afterEach(() => {
        mock.restore();
    });

    describe('#lookup', () => {
        const client = createSpikklClient(defaultConfig);

        it('returns a list of locations', done => {
            mock.onGet('https://api.spikkl.nl/geo/nld/lookup.json?postal_code=2611HB&street_number=175&key=valid_api_key').reply(200, locations.success.body);

            client
                .lookup({ postalCode: '2611HB', streetNumber: '175' })
                .then(results => {
                    expect(results).toStrictEqual(locations.success.body.results);
                    done();
                })
                .catch(error => {
                    expect(error).toBeUndefined();
                    done();
                });
        });

        it('accepts arguments laid to in HTTP API', done => {
            mock.onGet('https://api.spikkl.nl/geo/nld/lookup.json?postal_code=2611HB&street_number=175&key=valid_api_key&filter=postal_code').reply(200, locations.success.body);

            client
                .lookup({ postalCode: '2611HB', streetNumber: '175', filter: ['postal_code '] })
                .then(results => {
                    expect(results).toStrictEqual(locations.success.body.results);
                    done();
                })
                .catch(error => {
                    expect(error).toBeUndefined();
                    done();
                });
        });

        it('returns empty array if no match', done => {
            mock.onGet('https://api.spikkl.nl/geo/nld/lookup.json?postal_code=2611HB&street_number=1755&key=valid_api_key').reply(locations.notFound.status, locations.notFound.data);

            client
                .lookup({ postalCode: '2611HB', streetNumber: '1755' })
                .then(results => {
                    expect(results).toStrictEqual([]);
                    done();
                })
                .catch(error => {
                    expect(error).toBeUndefined();
                    done();
                });
        });

        it('catches for all other errors', done => {
            mock.onGet('https://api.spikkl.nl/geo/nld/lookup.json?postal_code=2611HB&street_number=1755&key=valid_api_key').reply(errors.quotaReached.status, errors.quotaReached.data);

            client
                .lookup({ postalCode: '2611HB', streetNumber: '1755' })
                .then(() => done(new Error('This test should throw')))
                .catch(error => {
                    expect(error).toBeInstanceOf(Error);
                    done();
                });
        });
    });
});
