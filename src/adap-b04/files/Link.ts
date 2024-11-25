import { Node } from "./Node";
import { Directory } from "./Directory";
import { MethodFailureException } from "../common/MethodFailureException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class Link extends Node {

    protected targetNode: Node | null = null;

    constructor(bn: string, pn: Directory, tn?: Node) {
        super(bn, pn);

        if (tn != undefined) {
            this.targetNode = tn;
            this.assertTargetIsSetTo(tn);
        }
    }

    public getTargetNode(): Node | null {
        return this.targetNode;
    }

    public setTargetNode(target: Node): void {
        this.assertArgumentNotNullOrUndefined(target);

        this.targetNode = target;

        this.assertTargetIsSetTo(target);
        this.assertClassInvariants();
    }

    public getBaseName(): string {
        const target = this.ensureTargetNode(this.targetNode);
        return target.getBaseName();
    }

    public rename(bn: string): void {
        const target = this.ensureTargetNode(this.targetNode);
        target.rename(bn);
    }

    protected ensureTargetNode(target: Node | null): Node {
        const result: Node = this.targetNode as Node;
        return result;
    }
    protected assertIsNotUndefined(node: Node | null): void {
        IllegalArgumentException.assertCondition(
        (node !== undefined),
        "undefined argument");

    }

    protected assertTargetIsSetTo(target: Node): void {
        MethodFailureException.assertCondition(
            (this.targetNode === target),
            "Target Node is not set correctly"
        )
    }

}
