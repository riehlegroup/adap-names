import { ModelMain } from "./ModelMain";

export abstract class ServiceMain extends ModelMain {

    protected startUp(): void {
        super.startUp();
        this.startService();
    }

    protected startService(): void {
        // do something
    }

    protected execute(): void {
        // start main event loop
    }

    protected shutDown(): void {
        this.closeService();        
        super.shutDown();
    }

    protected closeService(): void {
        // do something
    }

}