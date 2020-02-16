import axios from 'axios';
import mockAdapter from 'axios-mock-adapter';
import { list } from '../../src/resource';

const mock = new mockAdapter(axios);

describe('resource', () => {
    const resource = 'lookup';
    const format = 'json';
    const apiKey = 'some_api_key';
    const postalCode = '2611HB';

    const query = { key: apiKey, postal_code: postalCode };

    const client = axios.create();

    const resourceOptions = { resource, format, client };

    describe('#list', () => {
        mock.onGet('geo/nld/lookup.json?key=some_api_key&postal_code=2611HB').reply(200, {});

        it('generates a function that queries a resource', () => {
            list(resourceOptions)('nld', { query })
                .then(response => {
                    expect(response.data).toStrictEqual({});
                })
                .catch(error => expect(error).toBeUndefined());
        });
    });
});
