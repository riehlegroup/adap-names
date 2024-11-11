export interface Printable {

    /**
     * Returns human-readable representation of this object
     * Expects that delimiter is a single character
     */
    asString(delChar?: string): string;

    /**
     * Returns machine-readable representation of this object
     */
    asDataString(): string;

}