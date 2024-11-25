import { Node } from "./Node";
import { Directory } from "./Directory";
import { MethodFailureException } from "../common/MethodFailureException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

enum FileState {
    OPEN,
    CLOSED,
    DELETED        
};

export class File extends Node {

    protected state: FileState = FileState.CLOSED;

    constructor(baseName: string, parent: Directory) {
        super(baseName, parent);
    }

    public open(): void {
        this.assertIsClosedPre();
        
        // do something

        this.assertIsOpenPost();

        this.assertClassInvariants();
    }

    public close(): void {
        this.assertIsOpenPre();

        // do something

        this.assertIsClosedPost();

        this.assertClassInvariants()
    }

    protected doGetFileState(): FileState {
        return this.state;
    }

    protected assertIsOpenPre(): void {
        IllegalArgumentException.assertCondition(
            (this.state === FileState.OPEN),
            "File was not opene"
        )
    }
    protected assertIsClosedPre(): void {
        IllegalArgumentException.assertCondition(
            (this.state === FileState.CLOSED),
            "File was not closed"
        )
    }
    protected assertIsOpenPost(): void {
        MethodFailureException.assertCondition(
            (this.state === FileState.OPEN),
            "File was not opened correctly"
        )
    }
    protected assertIsClosedPost(): void {
        MethodFailureException.assertCondition(
            (this.state === FileState.CLOSED),
            "File was not closed correctly"
        )
    }

}
