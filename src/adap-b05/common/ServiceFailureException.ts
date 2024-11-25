import { Exception } from "./Exception";

/**
 * A ServiceFailureException signals that a service failed to provide its service.
 * ServiceFailureExceptions must be checked for by the client after the service call.
 */
export class ServiceFailureException extends Exception {

    static assertCondition(c: boolean, m: string = "service failed", t?: Exception): void {
        if (!c) throw new ServiceFailureException(m, t);
    }

    constructor(m: string, t?: Exception) {
        super(m, t);
    }
    
}
