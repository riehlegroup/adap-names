import { Exception } from "./Exception";

/**
 * An IllegalArgumentException signals an invalid argument.
 * In other words, a method precondition failed.
 */
export class IllegalArgumentException extends Exception {


    static assertIsNotNullOrUndefined(o: Object | null, exMsg: string = "null or undefined"): void {
        this.assertCondition(!this.isNullOrUndefined(o), exMsg);
    }
    
    static assertCondition(cond: boolean, exMsg: string): void {
        if (!cond) throw new IllegalArgumentException(exMsg);

    public static assert(c: boolean, m: string = "illegal argument", t?: Exception): void {
        if (!c) throw new IllegalArgumentException(m, t);

    }
    
    constructor(m: string) {
        super(m);
    }


    public getTrigger(): Exception {
        InvalidStateException.assert(this.hasTrigger());
        return super.getTrigger();
    }

}
