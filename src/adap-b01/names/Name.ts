export const DEFAULT_DELIMITER: string = '.';
export const ESCAPE_CHARACTER = '\\';

export class Name {
    private delimiter: string;
    private components: string[];

    /**
     * Constructs a new Name instance.
     * @param other An array of masked name components.
     * @param delimiter Optional delimiter character to use.
     */
    constructor(other: string[], delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter;
        this.components = other.map((comp) => this.validateMasked(comp));
    }

    /**
     * Returns a human-readable string representation using the specified delimiter.
     */
    public asString(delimiter: string = this.delimiter): string {
        return this.components.map((comp) => this.unmask(comp)).join(delimiter);
    }

    /**
     * Returns a machine-readable string representation using the default delimiter.
     */
    public asDataString(): string {
        return this.components.join(this.delimiter);
    }

    /**
     * Returns the component at the specified index.
     */
    public getComponent(i: number): string {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Index out of bounds");
        }
        return this.unmask(this.components[i]);
    }

    /**
     * Updates the component at the specified index with a properly masked value.
     */
    public setComponent(i: number, c: string): void {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Index out of bounds");
        }
        this.components[i] = this.validateMasked(c);
    }

    /**
     * Returns the number of components in the name.
     */
    public getNoComponents(): number {
        return this.components.length;
    }

    /**
     * Inserts a new masked component at the specified index.
     */
    public insert(i: number, c: string): void {
        if (i < 0 || i > this.components.length) {
            throw new Error("Index out of bounds");
        }
        this.components.splice(i, 0, this.validateMasked(c));
    }

    /**
     * Appends a new masked component to the end of the name.
     */
    public append(c: string): void {
        this.components.push(this.validateMasked(c));
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
     * Ensures the component is properly masked and validates against the delimiter and escape character.
     */
    private validateMasked(component: string): string {
        const regex = new RegExp(`[^\\${ESCAPE_CHARACTER}]\\${this.delimiter}|[^\\${ESCAPE_CHARACTER}]\\${ESCAPE_CHARACTER}`, 'g');
        if (regex.test(component)) {
            throw new Error(`Invalid masked component: ${component}`);
        }
        return component;
    }

    /**
     * Unmasks special characters in the component for human-readable output.
     */
    private unmask(component: string): string {
        return component.replace(new RegExp(`\\${ESCAPE_CHARACTER}(.)`, "g"), "$1");
    }
}
