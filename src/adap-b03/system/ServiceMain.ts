import { ModelMain } from "./ModelMain";

export class ServiceMain extends ModelMain {

    protected initialize(): void {
        super.initialize();
        this.initService();
    }

    protected initService(): void {
        // do something
    }

    protected finalize(): void {
        this.finiService();        
        super.finalize();
    }

    protected finiService(): void {
        // do something
    }

}