import { Main } from "./Main";

export class ModelMain extends Main {

    protected initialize(): void {
        super.initialize();
        this.initModel();
    }

    protected initModel(): void {
        // do something
    }

    protected finalize(): void {
        this.finiModel();        
        super.finalize();
    }

    protected finiModel(): void {
        // do something
    }

}