import { Exception } from "./Exception";

/**
 * A MethodFailedException signals that the method failed to provide its service.
 * In other words, a postcondition failed.
 */
export class MethodFailedException extends Exception {

    static assertIsNotNullOrUndefined(o: Object | null, m: string = "null or undefined", t?: Exception): void {
        this.assertCondition(!this.isNullOrUndefined(o), m, t);
    }
    
    static assertCondition(c: boolean, m: string = "method failed", t?: Exception): void {
        if (!c) throw new MethodFailedException(m, t);
    }

    constructor(m: string, t?: Exception) {
        super(m, t);
    }
    
}
