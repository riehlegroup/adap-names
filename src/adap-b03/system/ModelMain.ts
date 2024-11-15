import { Main } from "./Main";

export abstract class ModelMain extends Main {

    protected startUp(): void {
        super.startUp();
        this.loadModel();
    }

    protected loadModel(): void {
        // do nothing (expect subclass to override)
    }

    protected shutDown(): void {
        this.saveModel();        
        super.shutDown();
    }

    protected saveModel(): void {
        // do nothing (expect subclass to override)
    }

}