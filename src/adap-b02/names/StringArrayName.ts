import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        this.components = other
        if (delimiter != undefined) {
            this.delimiter = delimiter;
        }
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.components.join(delimiter).replaceAll("\\", "");
    }

    public asDataString(): string {
        if (this.delimiter == DEFAULT_DELIMITER) { // trivial case
            return this.components.join(DEFAULT_DELIMITER);
        } else {
            return this.components.map(comp =>
                comp
                    .replaceAll(this.getDelimRegExp(DEFAULT_DELIMITER), ESCAPE_CHARACTER + DEFAULT_DELIMITER) // escape default-delimiters 
                    .replaceAll(ESCAPE_CHARACTER + this.delimiter, this.delimiter) // un-escape instance-delimiters
            ).join(DEFAULT_DELIMITER);

        }
    }

    public isEmpty(): boolean {
        return this.components.length == 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        return this.components[i];
    }

    public setComponent(i: number, c: string): void {
        if ((i >= 0) && (i < this.getNoComponents())) {
            this.components[i] = c;
        } else {
            throw new Error("Index out of bounds.");
        }
    }

    public insert(i: number, c: string): void {
        if ((i >= 0) && (i <= this.getNoComponents())) {
            this.components.splice(i, 0, c);
        } else {
            throw new Error("Index out of bounds.");
        }
    }

    public append(c: string): void {
        this.components.push(c);
    }

    public remove(i: number): void {
        if ((i >= 0) && (i < this.getNoComponents())) {
            this.components.splice(i, 1);
        } else {
            throw new Error("Index out of bounds.");
        }
    }

    public concat(other: Name): void {
        if (other.getDelimiterCharacter() == this.getDelimiterCharacter()) {
            for (let i = 0; i < other.getNoComponents(); i++) {
                this.append(other.getComponent(i));
            }
        } else {
            throw new Error("Cannot concatenate names with different delimiters")
        }
    }

    private getDelimRegExp(delimiter: string = this.delimiter): RegExp {
        // Escape delimiter if it's a special regex character
        let escapedDelimiter: string = delimiter.replaceAll(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        let escapedEscapeCharacter: string = ESCAPE_CHARACTER.replaceAll(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); // I actually feel stupid doing this

        // RegExp to find all unescaped delimiter chars
        return new RegExp(`(?<!${escapedEscapeCharacter})${escapedDelimiter}`, 'g');
    }
}
