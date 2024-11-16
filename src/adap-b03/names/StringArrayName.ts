import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        super(delimiter);
        this.components = other.map(s => this.notEscaped(s, this.delimiter));
    }

    asDataString(): string {
        return this.components.map(s => this.escaped(s, this.delimiter)).join(this.delimiter);
    }
    asString(delimiter: string = this.delimiter): string {
        return this.components.join(delimiter);
    }

    getNoComponents(): number {
        return this.components.length;
    }

    getComponent(i: number): string {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Index out of Bounds");
        }
        return this.components[i];
    }

    setComponent(i: number, c: string) {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Index out of Bounds");
        }
        this.components[i] = c;
    }

    insert(i: number, c: string) {
        if (i < 0 || i > this.components.length) {
            throw new Error("Index out of Bounds");
        }
        this.components.splice(i, 0, c);
    }

    append(c: string) {
        this.components.push(c);
    }

    remove(i: number) {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Index out of Bounds");
        }
        this.components.splice(i, 1);
    }
}