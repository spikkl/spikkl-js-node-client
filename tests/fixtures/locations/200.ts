export const locationSuccess = {
    statusText: 'Success',
    url: '/geo/nld/lookup.json',
    query: {
        key: 'valid_api_key',
        postal_code: '2611HB',
        street_number: '175',
    },
    headers: {},
    status: 200,
    body: {
        status: 'ok',
        results: [
            {
                location_id: '5e42f99256f3807d5c7e6ac0',
                postal_code: '2611HB',
                street_number: 175,
                street_number_affix: null,
                street_name: 'Oude Delft',
                city: 'Delft',
                municipality: 'Delft',
                administrative_areas: [
                    {
                        type: 'province',
                        name: 'Zuid-Holland',
                        abbreviation: 'ZH',
                    },
                ],
                country: {
                    iso3_code: 'NLD',
                    iso2_code: 'NL',
                    name: 'Nederland',
                },
                centroid: {
                    latitude: 52.012133,
                    longitude: 4.354901,
                },
                formatted_address: 'Oude Delft 175, 2611KL Delft, Nederland',
            },
        ],
        meta: {
            timestamp: 1577703950867,
            trace_id: 'some_trace_id',
        },
    },
};
