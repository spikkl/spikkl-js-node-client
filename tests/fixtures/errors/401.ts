export const invalidApiKeyError = {
    statusText: 'Invalid API Key',
    url: '/geo/nld/lookup.json',
    query: {
        api_key: 'invalid_api_key',
    },
    headers: {},
    status: 401,
    data: {
        status: 'failed',
        status_code: 'INVALID_API_KEY',
    },
};
