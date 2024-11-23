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

    getComponent(i: number): string {
        this.assertInBounds(i);
        return this.components[i];
    }

    setComponent(i: number, c: string) {
        this.assertInBounds(i);
        this.components[i] = c;
    }

    insert(i: number, c: string) {
        this.assertInBounds(i);
        this.components.splice(i, 0, c);
    }

    append(c: string) {
        this.components.push(c);
    }

    remove(i: number) {
        this.assertInBounds(i);
        this.components.splice(i, 1)
    }
}
