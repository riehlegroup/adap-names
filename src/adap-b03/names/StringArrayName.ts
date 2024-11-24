import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        super(delimiter);
        this.components = other;
    }

    getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        this.assertInBounds(i);
        return this.components[i];
    }

    public setComponent(i: number, c: string) {
        this.assertInBounds(i);
        this.components[i] = c;
    }

    public insert(i: number, c: string) {
        this.assertInBounds(i);
        this.components.splice(i, 0, c);
    }

    public append(c: string) {
        this.components.push(c);
    }

    public remove(i: number) {
        this.assertInBounds(i);
        this.components.splice(i, 1)
    }
}
