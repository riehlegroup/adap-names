import { Exception } from "./Exception";
import { InvalidStateException } from "./InvalidStateException";

/**
 * An IllegalArgumentException signals an invalid argument.
 * In other words, a method precondition failed.
 */
export class IllegalArgumentException extends Exception {

    public static assert(c: boolean, m: string = "illegal argument", t?: Exception): void {
        if (!c) throw new IllegalArgumentException(m, t);
    }
    
    constructor(m: string, t?: Exception) {
        super(m, t);
    }

}
