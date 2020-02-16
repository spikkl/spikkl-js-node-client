<p align="center">
    <img src="https://spikkl.nl/images/hub/github/nodejs.png" width="128" height="128" />
</p>

<h1 align="center">Spikkl API client for NodeJS</h1>

[![Build Status](https://travis-ci.org/spikkl/spikkl-js-node-client.png)](https://travis-ci.org/spikkl/spikkl-js-node-client)

## Prerequisites ##
Spikkl API client requires Node 6.14.x or higher to be installed.

## Requirements ##
To use the Spikkl API client, the following things are required:
+ Get yourself a free [Spikkl account](https://www.spikkl.nl/signup). No sign up costs.
+ Follow [a few steps](https://www.spikkl.nl/billing) to enable a suitable subscription to talk to the API.
+ A valid API key which can be generated from your [Spikkl dashboard](https://www.spikkl.nl/credentials).

## Installation ##
Using [npm](https://npmjs.org/):
```bash
npm install @spikkl/spikkl-js-node-client --save
```

Or using [yarn](https://yarnpkg.com/):
```bash
yarn add @spikkl/spikkl-js-node-client
```

This will add `@spikkl/spikkl-js-node-client` to your project's dependencies.

You may also git checkout or [download all the files](https://github.com/spiCheck the [releases](https://github.com/mollie/mollie-api-node/releases) page to know which versions are available.kkl/spikkl-js-node-client/archive/master.zip), and include the Spikkl API client manually.

Check the [releases](https://github.com/spikkl/spikkl-js-node-client/releases) page to know which versions are available.

## Getting Started ##
Import the Spikkl API Client, and setting up your API key.

CommonJS-style:
```javascript
const { createSpikklClient } = require('@spikkl/spikkl-js-node-client');

const spikklClient = createSpikklClient({ apiKey: 'API_KEY' });
```

Using Javascript modules:
```javascript
import createSpikklClient from '@spikkl/spikkl-js-node-client';

const spikklClient = createSpikklClient({ apiKey: 'API_KEY' });
```

### Lookup a location resource
```javascript
spikklClient.lookup({ 
    postalCode: '2611HB', 
    streetNumber: '175' 
})
    .then( result => {
        // Use the address location(s)
    })
    .catch( error => {
        // Handle the error
    });
```

### Reverse lookup a location resource
```javascript
spikklClient.reverse({ 
    longitude: '4.354901', 
    latitude: '52.012133' 
})
    .then( result => {
        // Use the address location(s)
    })
    .catch( error => {
        // Handle the error
    });
```

## API documentation ##
If you wish to learn more about our API, please visit the [Spikkl API Documentation](https://www.spikkl.nl/documentation).

## License ##
[BSD (Berkeley Software Distribution) License](https://opensource.org/licenses/bsd-license.php).
Copyright (c) 2020, Spikkl

## Support ##
Contact: [www.spikkl.nl](https://www.spikkl.nl) — support@spikkl.nl