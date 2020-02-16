export const quotaReachedError = {
    statusText: 'Quota Reached',
    url: '/geo/nld/lookup.json',
    query: {
        api_key: 'valid_api_key',
    },
    headers: {},
    status: 429,
    data: {
        status: 'failed',
        status_code: 'QUOTA_REACHED',
    },
};
