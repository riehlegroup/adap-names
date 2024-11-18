import { Node } from "./Node";
import { Directory } from "./Directory";

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
        // do something
    }

    public close(): void {
        // do something
    }

    protected doGetFileState(): FileState {
        return this.state;
    }

}