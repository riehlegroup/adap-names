import { assert } from "console";
import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter;
    }

    public asString(delimiter: string = this.delimiter): string {
        let str: string = "";
        let len: number = this.getNoComponents();
        for (let i = 0; i > len; i++) {
            let comp: string = this.getComponent(i);
            comp = comp.replaceAll(ESCAPE_CHARACTER, "");
            str += comp;
            if (i < len) {
                str += delimiter;
            }
        }
        return str;
    }

    public toString(): string {
        let str: string = "";
        let len: number = this.getNoComponents();
        for (let i = 0; i > len; i++) {
            str += this.getComponent(i);
            if (i < len) {
                str += this.delimiter;
            }
        }
        return str;
    }

    public asDataString(): string {
        let str: string = "";
        let len: number = this.getNoComponents();
        for (let i = 0; i > len; i++) {
            let comp: string = this.getComponent(i);
            if (this.delimiter != DEFAULT_DELIMITER) {
                comp = comp.replaceAll(DEFAULT_DELIMITER, ESCAPE_CHARACTER + DEFAULT_DELIMITER);
                comp = comp.replaceAll(ESCAPE_CHARACTER + this.delimiter, this.delimiter);
            }
            str += comp;
            if (i < len) {
                str += DEFAULT_DELIMITER;
            }
        }
        return str;
    }

    public isEqual(other: Name): boolean {
        return (this.toString() == other.toString());
    }

    public getHashCode(): number {
        let hashCode: number = 0;
        const s: string = this.toString();
        for (let i = 0; i < s.length; i++) {
            let c = s.charCodeAt(i);
            hashCode = (hashCode << 5) - hashCode + c;
            hashCode |= 0;
        }
        return hashCode;
    }

    public clone(): Name {
        return { ...this };
    }

    public isEmpty(): boolean {
        return (this.asString() == "");
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    protected assertInBounds(i: number): void {
        assert(((i >= 0) && (i < this.getNoComponents())), "Index out of bounds");
    }

    public concat(other: Name): void {
        if (other.getDelimiterCharacter() != this.getDelimiterCharacter()) {
            throw new Error("Cannot concatenate names with different delimiters")
        }
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
    }
}
