import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        super(delimiter);

        other.forEach(this.assertIsValidComponent);
        this.components = other;
    }

    getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        // pre-conditions
        this.assertIndexInBounds(i);

        this.assertIndexInBounds(i);
        return this.components[i];
    }

    public setComponent(i: number, c: string) {
        // pre-conditions
        this.assertIndexInBounds(i);
        this.assertIsValidComponent(c);

        this.components[i] = c;
    }

    public insert(i: number, c: string) {
        // pre-conditions
        this.assertIndexInBounds(i);
        this.assertIsValidComponent(c);

        this.components.splice(i, 0, c);
    }

    public append(c: string) {
        // pre-conditions
        this.assertIsValidComponent(c);

        this.components.push(c);
    }

    public remove(i: number) {
        // pre-conditions
        this.assertIndexInBounds(i);

        this.components.splice(i, 1)
    }
}
