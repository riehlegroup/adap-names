import { InvalidStateException } from "../common/InvalidStateException";
import { Name } from "../names/Name";
import { StringName } from "../names/StringName";
import { Directory } from "./Directory";

export class RootNode extends Directory {

    protected static ROOT_NODE: RootNode = new RootNode();

    public static getRootNode() {
        return this.ROOT_NODE;
    }

    constructor() {
        super("", new Object as Directory);
        this.parentNode = this;
    }

    public getFullName(): Name {
        let name: StringName = new StringName("", '/');
        this.assertReturnNotNullOrUndefined(name);
        this.assertClassInvariants();

        return name;
    }

    public move(to: Directory): void {
        // null operation
        this.assertClassInvariants();
    }

    protected doSetBaseName(bn: string): void {
        // null operation
        this.assertClassInvariants();
    }

    protected assertClassInvariants(): void {
        super.assertClassInvariants()
        InvalidStateException.assertCondition(
            (this.parentNode === this),
            "RootNode must always be its own parent"
        )
        InvalidStateException.assertCondition(
            (this.baseName === ""),
            "RootNodes basename must be empty"
        )
    }

}
