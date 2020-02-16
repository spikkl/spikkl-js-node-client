export const locationOutOfRange = {
    statusText: 'Out Of Range',
    url: '/geo/nld/reverse.json',
    query: {
        api_key: 'valid_api_key',
        longitude: '4.34878',
        latitude: '50.85045',
    },
    headers: {},
    status: 400,
    data: {
        status: 'failed',
        status_code: 'OUT_OF_RANGE',
    },
};
