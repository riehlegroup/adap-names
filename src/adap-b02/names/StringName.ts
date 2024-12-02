import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {
    protected delimiter: string;
    protected name: string;
    protected noComponents: number;

    constructor(other: string, delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter || DEFAULT_DELIMITER;
        this.name = other;
        this.noComponents = this.calculateComponents(this.name);
    }

    /**
     * Converts the name into a string representation with the specified delimiter.
     */
    public asString(delimiter: string = this.delimiter): string {
        return this.name.split(this.delimiter).join(delimiter);
    }

    /**
     * Converts the name into a string representation using its internal delimiter.
     */
    public asDataString(): string {
        return this.name;
    }

    /**
     * Returns the delimiter character used by this instance.
     */
    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    /**
     * Returns true if the name has no components.
     */
    public isEmpty(): boolean {
        return this.noComponents === 0;
    }

    /**
     * Returns the number of components in the name.
     */
    public getNoComponents(): number {
        return this.noComponents;
    }

    /**
     * Retrieves the component at the specified index.
     */
    public getComponent(x: number): string {
        const components = this.name.split(this.delimiter);
        if (x < 0 || x >= components.length) {
            throw new Error("Index out of bounds");
        }
        return this.unmask(components[x]);
    }

    /**
     * Sets the component at the specified index to a new value.
     */
    public setComponent(n: number, c: string): void {
        const components = this.name.split(this.delimiter);
        if (n < 0 || n >= components.length) {
            throw new Error("Index out of bounds");
        }
        components[n] = this.mask(c);
        this.name = components.join(this.delimiter);
    }

    /**
     * Inserts a new component at the specified index.
     */
    public insert(n: number, c: string): void {
        const components = this.name.split(this.delimiter);
        if (n < 0 || n > components.length) {
            throw new Error("Index out of bounds");
        }
        components.splice(n, 0, c);
        this.name = components.join(this.delimiter);
        this.noComponents = components.length;
    }

    /**
     * Appends a new component to the name.
     */
    public append(c: string): void {
        this.name += `${this.delimiter}${this.mask(c)}`;
        this.noComponents++;
    }

    /**
     * Removes the component at the specified index.
     */
    public remove(n: number): void {
        const components = this.name.split(this.delimiter);
        if (n < 0 || n >= components.length) {
            throw new Error("Index out of bounds");
        }
        components.splice(n, 1);
        this.name = components.join(this.delimiter);
        this.noComponents = components.length;
    }

    /**
     * Concatenates another `Name` to this instance.
     */
    public concat(other: Name): void {
        const componentsToAdd: string[] = [];
        for (let i = 0; i < other.getNoComponents(); i++) {
            componentsToAdd.push(this.mask(other.getComponent(i)));
        }
        this.name += `${this.delimiter}${componentsToAdd.join(this.delimiter)}`;
        this.noComponents += componentsToAdd.length;
    }

    /**
     * Masks special characters in the string.
     */
    private mask(component: string): string {
        return component.replace(
            new RegExp(`[\\${this.delimiter}\\${ESCAPE_CHARACTER}]`, "g"),
            (match) => `${ESCAPE_CHARACTER}${match}`
        );
    }

    /**
     * Unmasks the string, restoring special characters to their original form.
     */
    private unmask(component: string): string {
        return component.replace(new RegExp(`\\${ESCAPE_CHARACTER}(.)`, "g"), "$1");
    }

    /**
     * Calculates the number of components based on the delimiter.
     */
    private calculateComponents(name: string): number {
        return name ? name.split(this.delimiter).length : 0;
    }
}
