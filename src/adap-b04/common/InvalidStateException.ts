import { Exception } from "./Exception";

/**
 * An InvalidStateException signals an invalid state of an object.
 * In other words, a class invariant failed.
 */
export class InvalidStateException extends Exception {

    static assertIsNotNullOrUndefined(o: Object | null, exMsg: string = "null or undefined"): void {
        this.assertCondition(!this.isNullOrUndefined(o), exMsg);
    }
    
    static assertCondition(cond: boolean, exMsg: string): void {
        if (!cond) throw new InvalidStateException(exMsg);

  
    public static assert(c: boolean, m: string = "invalid state", t?: Exception): void {
        if (!c) throw new InvalidStateException(m, t);
    }

    constructor(m: string) {
        super(m);
    }
    
}
