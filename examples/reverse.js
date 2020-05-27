/**
 * @docs https://www.spikkl.nl/documentation/request
 */
const { createSpikklClient } = require('@spikkl/spikkl-js-node-client');

const spikklClient = createSpikklClient({ apiKey: 'some_api_key' });

( async () => {
    try {
        const result = await spikklClient.reverse({ longitude: 4.354901, latitude: 52.012133 });

        console.log(result);
    } catch (error) {
        console.warn(error);
    }
})();