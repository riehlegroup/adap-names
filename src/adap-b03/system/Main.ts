export class Main {

    public run(args: string[]): void {
        this.parseArgs(args);
        this.initialize();
        this.execute();
        this.finalize();
    };

    protected parseArgs(args: string[]): void {
        // do nothing
    }

    protected initialize(): void {
        // do nothing
    }

    protected execute(): void {
        // do nothing
    }

    protected finalize(): void {
        // do nothing
    }

}