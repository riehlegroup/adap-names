import { Exception } from "./Exception";

/**
 * An InvalidStateException signals an invalid state of an object.
 * In other words, a class invariant failed.
 */
export class InvalidStateException extends Exception {

    static assertIsNotNullOrUndefined(o: Object | null, m: string = "null or undefined", t?: Exception): void {
        this.assertCondition(!this.isNullOrUndefined(o), m, t);
    }
    
    static assertCondition(c: boolean, m: string = "invalid state", t?: Exception): void {
        if (!c) throw new InvalidStateException(m, t);
    }

    constructor(m: string, t?: Exception) {
        super(m, t);
    }
    
}
