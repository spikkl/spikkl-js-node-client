export const revokedApiKeyError = {
    statusText: 'Revoked API Key',
    url: '/geo/nld/lookup.json',
    query: {
        api_key: 'invalid_api_key',
    },
    headers: {},
    status: 403,
    data: {
        status: 'failed',
        status_code: 'REVOKED_API_KEY',
    },
};

export const accessRestrictedError = {
    statusText: 'Access Restricted',
    url: '/geo/nld/lookup.json',
    query: {
        api_key: 'invalid_api_key',
    },
    headers: {},
    status: 403,
    data: {
        status: 'failed',
        status_code: 'ACCESS_RESTRICTED',
    },
};
