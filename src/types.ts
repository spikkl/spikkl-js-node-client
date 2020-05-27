import createSpikklClient from './createSpikklClient';
import { LookupLocationOptions, ReverseLookupLocationOptions } from './resources/locations';

export default createSpikklClient;

export * from './createSpikklClient';

/**
 * Authenticable interface
 */
export interface Authenticable {
    apiKey?: string;
}

export type LocationKeys = keyof Location;

/**
 * Filterable interface
 */
export interface Filterable {
    filter?: LocationKeys[];
}

/**
 * StringMap interface
 */
export interface StringMap {
    [key: string]: string;
}

/**
 * OptionalStringMap interface
 */
export interface OptionalStringMap {
    [key: string]: string | undefined;
}

/**
 * ClientInstance interface
 */
export interface ClientInstance {
    lookup: (lookupOptions: LookupLocationOptions) => Promise<Location[]>;
    reverse: (lookupOptions: ReverseLookupLocationOptions) => Promise<Location[]>;
}

/**
 * Country interface
 */
export interface Country {
    iso3_code: string;
    iso2_code: string;
    name: string;
}

/**
 * Centroid interface
 */
export interface Centroid {
    latitude: number;
    longitude: number;
}

/**
 * AdministrativeArea interface
 */
export interface AdministrativeArea {
    type: string;
    name: string;
    abbreviation: string;
}

/**
 * Location interface
 */
export interface Location {
    location_id: string;
    postal_code: string;
    street_number: number | null;
    street_number_affix: string | null;
    city: string;
    municipality: string;
    administrative_areas: AdministrativeArea[];
    country: Country;
    centroid: Centroid | null;
    formatted_address: string;
}
