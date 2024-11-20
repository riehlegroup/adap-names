import { Exception } from "./Exception";

/**
 * A MethodFailureException signals that the method failed to provide its service.
 * In other words, a postcondition failed.
 */
export class MethodFailureException extends Exception {

    static assertIsNotNullOrUndefined(o: Object | null, exMsg: string = "null or undefined"): void {
        this.assertCondition(!this.isNullOrUndefined(o), exMsg);
    }
    
    static assertCondition(cond: boolean, exMsg: string): void {
        if (!cond) throw new MethodFailureException(exMsg);
    }

    constructor(m: string) {
        super(m);
    }
    
}
