import { Exception } from "./Exception";

/**
 * A MethodFailedException signals that the method failed to provide its service.
 * In other words, a postcondition failed.
 */
export class MethodFailedException extends Exception {

    static assertNotNullOrUndefined(o: Object | null, exMsg: string = "null or undefined"): void {
        this.assertCondition(this.isNullOrUndefined(o), exMsg);
    }
    
    static assertCondition(cond: boolean, exMsg: string): void {
        if (!cond) throw new MethodFailedException(exMsg);
    }

    constructor(m: string) {
        super(m);
    }
    
}
