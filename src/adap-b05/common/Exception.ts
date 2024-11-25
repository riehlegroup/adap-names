import { InvalidStateException } from "./InvalidStateException";

/**
 * Root class for exceptions in ADAP examples
 */
export abstract class Exception extends Error {

    protected trigger: Exception | null = null;

    static isNullOrUndefined(o: Object | null) {
        return (o == undefined) || (o == null);
    }

    constructor(m: string, t?: Exception) {
        super(m);

        if (t != undefined) {
            this.trigger = t;
        }
    }

    public hasTrigger(): boolean {
        return this.trigger != null;
    }

    public getTrigger(): Exception {
        this.assertHasTrigger(); // should be InvalidStateException
        return this.trigger as Exception;
    }

    protected assertHasTrigger(): void {
        if (!this.hasTrigger()) {
            throw new (class extends Exception {
                constructor(t: Exception) {
                    super("exception had no trigger", t); 
                }
            })(this);
        }
    }

}