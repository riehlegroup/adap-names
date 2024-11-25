import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        super(delimiter);

        // other.forEach(this.assertIsValidComponent);
        this.components = other;
    }

    getNoComponents(): number {
        let l: number = this.components.length;

        this.assertReturnNotNullOrUndefined(l, "lenght")
        return l;
    }

    public getComponent(i: number): string {
        // pre-conditions
        this.assertIndexInBounds(i);

        this.assertIndexInBounds(i);
        let c: string = this.components[i];

        this.assertReturnNotNullOrUndefined(c, "component");

        return c;
    }

    public setComponent(i: number, c: string) {
        // pre-conditions
        this.assertIndexInBounds(i);
        this.assertIsValidComponent(c);

        this.components[i] = c;

        this.assertComponentEquals(i, c);
        this.assertClassInvariants();
    }

    public insert(i: number, c: string) {
        // pre-conditions
        this.assertIndexInBoundsForInsert(i);
        this.assertIsValidComponent(c);
        let oldLen: number = this.getNoComponents();

        this.components.splice(i, 0, c);

        this.assertComponentInserted(i, c, oldLen);
        this.assertClassInvariants();
    }

    public append(c: string) {
        // pre-conditions
        this.assertIsValidComponent(c);
        let oldLen: number = this.getNoComponents();

        this.components.push(c);

        this.assertComponentAppended(c, oldLen);
    }

    public remove(i: number) {
        // pre-conditions
        this.assertIndexInBounds(i);
        let oldLen: number = this.getNoComponents();


        this.components.splice(i, 1)

        this.assertComponentRemoved(oldLen);
    }
}
