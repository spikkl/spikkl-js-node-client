import { invalidApiKeyError } from './errors/401';
import { revokedApiKeyError, accessRestrictedError } from './errors/403';
import { pageNotFoundError } from './errors/404';
import { quotaReachedError } from './errors/429';

import { locationSuccess } from './locations/200';
import { locationOutOfRange } from './locations/400';
import { locationNotFound } from './locations/404';
import { locationInvalidRequest } from './locations/422';

export const errors = {
    invalidApiKey: invalidApiKeyError,
    revokedApiKey: revokedApiKeyError,
    quotaReached: quotaReachedError,
    accessRestricted: accessRestrictedError,
    pageNotFound: pageNotFoundError,
};

export const locations = {
    success: locationSuccess,
    notFound: locationNotFound,
    outOfRange: locationOutOfRange,
    invalidRequest: locationInvalidRequest,
};
