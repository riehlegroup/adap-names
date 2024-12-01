/**
 * Root class for exceptions in ADAP examples
 */
export abstract class Exception extends Error {

    static isNullOrUndefined(o: Object | null) {
        return (o == undefined) || (o == null);
    }

    constructor(m: string) {
        super(m);
    }

}