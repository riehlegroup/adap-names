import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailureException } from "../common/MethodFailureException";
import { Node } from "./Node";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
    }

    public add(cn: Node): void {
        this.assertArgumentNotNullOrUndefined(cn);
        this.assertNotContainingPre(cn);

        this.childNodes.add(cn);

        this.assertContainsPost(cn);
        this.assertClassInvariants();
    }

    public remove(cn: Node): void {
        this.assertArgumentNotNullOrUndefined(cn);
        this.assertContainsPre(cn);

        this.childNodes.delete(cn); // Yikes! Should have been called remove

        this.assertNotContainingPost(cn);
    }



    // public hasChild(node: Node): boolean {
    //     return this.childNodes.has(node);
    // }

    protected assertNotContainingPre(node: Node): void {
        IllegalArgumentException.assertCondition(
            (!this.childNodes.has(node)),
            "Node should not be contained"
        )
    }
    protected assertContainsPre(node: Node): void {
        IllegalArgumentException.assertCondition(
            (this.childNodes.has(node)),
            "Node should be contained"
        )
    }

    protected assertNotContainingPost(node: Node): void {
        MethodFailureException.assertCondition(
            (!this.childNodes.has(node)),
            "Node should not be contained"
        )
    }
    protected assertContainsPost(node: Node): void {
        MethodFailureException.assertCondition(
            (this.childNodes.has(node)),
            "Node should be contained"
        )
    }

}
