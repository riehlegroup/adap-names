import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailureException } from "../common/MethodFailureException";
import { Name } from "../names/Name";
import { Directory } from "./Directory";
import { RootNode } from "./RootNode";

export class Node {

    protected baseName: string = "";
    protected parentNode: Directory;

    constructor(bn: string, pn: Directory) {
        this.assertArgumentNotNullOrUndefined(bn);
        this.assertArgumentNotNullOrUndefined(pn);

        this.doSetBaseName(bn);
        this.parentNode = pn;

        this.assertBaseNameIs(bn);
        this.assertParentNodeIs(pn);
    }

    public move(to: Directory): void {
        this.assertArgumentNotNullOrUndefined(to);
        // let oldParent: Directory = this.parentNode;

        this.parentNode.remove(this);
        to.add(this);

        // this.assertNotInDir(oldParent);
        // this.assertInDir(to);
        this.assertParentNodeIs(to);

        this.assertClassInvariants();
    }

    public getFullName(): Name {
        const result: Name = this.parentNode.getFullName();
        result.append(this.getBaseName());

        this.assertReturnNotNullOrUndefined(result);

        return result;
    }

    public getBaseName(): string {
        let bn: string = this.doGetBaseName();

        this.assertReturnNotNullOrUndefined(bn);
        return bn;
    }

    protected doGetBaseName(): string {
        return this.baseName;
    }

    public rename(bn: string): void {
        this.assertArgumentNotNullOrUndefined(bn);

        this.doSetBaseName(bn);

        this.assertBaseNameIs(bn);
    }

    protected doSetBaseName(bn: string): void {
        this.baseName = bn;
    }

    public getParentNode(): Node {
        let parent: Node = this.parentNode;

        this.assertReturnNotNullOrUndefined(parent);
        return parent
    }

    // pre-conditions
    protected assertArgumentNotNullOrUndefined(returnVal: Object | null, exMsg: string = "argument null or undefined"): void {
        IllegalArgumentException.assertIsNotNullOrUndefined(returnVal, exMsg);
    }

    // class invariants
    protected assertClassInvariants(): void {
        InvalidStateException.assertIsNotNullOrUndefined(this.parentNode);
        InvalidStateException.assertIsNotNullOrUndefined(this.baseName);
        // InvalidStateException.assertCondition(
        //     this.parentNode.hasChild(this),
        //     "Node is not known by its parent"
        // )
    }

    // post-conditions
    protected assertReturnNotNullOrUndefined(returnVal: Object | null, exMsg: string = "return value null or undefined"): void {
        MethodFailureException.assertIsNotNullOrUndefined(returnVal, exMsg);
    }
    protected assertBaseNameIs(bn: string): void {
        MethodFailureException.assertCondition(
            (this.getBaseName() === bn),
            "Failed setting BaseName"
        )
    }

    protected assertParentNodeIs(pn: Directory): void {
        MethodFailureException.assertCondition(
            (this.getParentNode() === pn),
            "Parent Node not is set correctly"
        )
    }

    // protected assertNotInDir(dir: Directory): void {
    //     MethodFailureException.assertCondition(
    //         (!dir.hasChild(this)),
    //         "Node should not be contained"
    //     )
    // }
    // protected assertInDir(dir: Directory): void {
    //     MethodFailureException.assertCondition(
    //         (dir.hasChild(this)),
    //         "Node should be contained"
    //     )
    // }


}
