import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {
    protected delimiter: string;
    protected components: string[];

    constructor(other: string[] = [], delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter;
        this.components = other.map((comp) => this.mask(comp));
    }

    /**
     * Converts the name to a string representation with the specified delimiter.
     */
    public asString(delimiter: string = this.delimiter): string {
        return this.components.map((comp) => this.unmask(comp)).join(delimiter);
    }

    /**
     * Converts the name to a string representation using its internal delimiter.
     */
    public asDataString(): string {
        return this.asString(this.delimiter);
    }

    /**
     * Returns the delimiter character used by this name instance.
     */
    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    /**
     * Returns true if there are no components in the name.
     */
    public isEmpty(): boolean {
        return this.components.length === 0;
    }

    /**
     * Returns the number of components in the name.
     */
    public getNoComponents(): number {
        return this.components.length;
    }

    /**
     * Retrieves the component at the specified index.
     */
    public getComponent(i: number): string {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Index out of bounds");
        }
        return this.unmask(this.components[i]);
    }

    /**
     * Sets the component at the specified index to the provided value.
     */
    public setComponent(i: number, c: string): void {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Index out of bounds");
        }
        this.components[i] = this.mask(c);
    }

    /**
     * Inserts a new component at the specified index.
     */
    public insert(i: number, c: string): void {
        if (i < 0 || i > this.components.length) {
            throw new Error("Index out of bounds");
        }
        this.components.splice(i, 0, this.mask(c));
    }

    /**
     * Appends a new component to the end of the name.
     */
    public append(c: string): void {
        this.components.push(this.mask(c));
    }

    /**
     * Removes the component at the specified index.
     */
    public remove(i: number): void {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Index out of bounds");
        }
        this.components.splice(i, 1);
    }

    /**
     * Concatenates another name to this name.
     */
    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
    }

    /**
     * Masks special characters in a string to ensure delimiter and escape characters
     * appear verbatim.
     */
    private mask(component: string): string {
        return component.replace(new RegExp(`[\\${this.delimiter}\\${ESCAPE_CHARACTER}]`, "g"), (match) => `${ESCAPE_CHARACTER}${match}`);
    }

    /**
     * Unmasks a string to restore its original form.
     */
    private unmask(component: string): string {
        return component.replace(new RegExp(`\\${ESCAPE_CHARACTER}(.)`, "g"), "$1");
    }
}
