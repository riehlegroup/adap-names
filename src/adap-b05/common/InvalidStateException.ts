import { Exception } from "./Exception";

/**
 * An InvalidStateException signals an invalid state of an object.
 * In other words, a class invariant failed.
 */
export class InvalidStateException extends Exception {

    static assertNotNullOrUndefined(o: Object | null, exMsg: string = "null or undefined"): void {
        this.assertCondition(this.isNullOrUndefined(o), exMsg);
    }
    
    static assertCondition(cond: boolean, exMsg: string): void {
        if (!cond) throw new InvalidStateException(exMsg);
    }

    constructor(m: string) {
        super(m);
    }
    
}
