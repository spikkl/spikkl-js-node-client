export const locationNotFound = {
    statusText: 'Zero Results',
    url: '/geo/nld/lookup.json',
    query: {
        api_key: 'valid_api_key',
        postal_code: '2611HB',
        street_number: '1755',
    },
    headers: {},
    status: 404,
    data: {
        status: 'failed',
        status_code: 'ZERO_RESULTS',
    },
};
