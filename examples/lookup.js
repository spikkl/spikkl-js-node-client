/**
 * @docs https://www.spikkl.nl/documentation/request
 */
const { createSpikklClient } = require('@spikkl/spikkl-js-node-client');

const spikklClient = createSpikklClient({ apiKey: 'some_api_key' });

( async () => {
    try {
        const result = await spikklClient.lookup({ postalCode: '2611HB', streetNumber: 175 });

        console.log(result);
    } catch (error) {
        console.warn(error);
    }
})();