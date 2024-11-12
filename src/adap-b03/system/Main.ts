export abstract class Main {

    public run(args: string[]): void {
        this.parseArgs(args);
        this.startUp();
        this.execute();
        this.shutDown();
    };

    protected parseArgs(args: string[]): void {
        // do nothing (expect subclass to override)
    }

    protected startUp(): void {
        // do nothing (expect subclass to override)
    }

    protected abstract execute(): void;

    protected shutDown(): void {
        // do nothing (expect subclass to override)
    }

}