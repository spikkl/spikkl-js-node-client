export const pageNotFoundError = {
    statusText: 'Page Not Found',
    url: '/geo/nld/lookdown.json',
    query: {
        api_key: 'invalid_api_key',
    },
    headers: {},
    status: 404,
    data: {
        status: 'failed',
        status_code: 'PAGE_NOT_FOUND',
    },
};
