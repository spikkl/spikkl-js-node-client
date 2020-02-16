export const locationInvalidRequest = {
    statusText: 'Zero Results',
    url: '/geo/nld/lookup.json',
    query: {
        api_key: 'valid_api_key',
        postal_cod: '2611HB',
        street_number: '1755',
    },
    headers: {},
    status: 422,
    data: {
        status: 'failed',
        status_code: 'INVALID_REQUEST',
    },
};
