
import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";
import { Cloneable } from "../common/Cloneable";
import { Equality } from "../common/Equality";
import { Printable } from "../common/Printable";


export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter
    }

    abstract asString(delimiter: string): string;
    public clone(): Name {
        throw new Error("needs implementation");
    }


    public toString(): string {
        return this.asDataString()
    }

    abstract asDataString(): string;

    public isEqual(other: Name): boolean {
        return this.asDataString() === other.asDataString();
    }

    public getHashCode(): number {
        let hashCode: number = 0;
        const s: string = this.asDataString();
        for (let i = 0; i < s.length; i++) {
            let c = s.charCodeAt(i);
            hashCode = (hashCode << 5) - hashCode + c;
            hashCode |= 0;
        }
        return hashCode;
    }

    public clone(): Name {
        return JSON.parse(JSON.stringify(this));
    }

    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
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

    public concat(other: Name): void {
        if (other.getDelimiterCharacter() != this.delimiter) {
            throw new Error("Delimiters do not match");
        }
        for(let i = 0; i < other.getNoComponents(); ++i) {
            this.append(other.getComponent(i));
        }
    }

    /** @methodtype helper-method */
    protected escaped(s: string, d: string): string {
        const regex = new RegExp(d, 'g');
        return s.replace(regex, ESCAPE_CHARACTER + d);
}

    /** @methodtype helper-method */
    protected notEscaped(s: string, d: string): string {
        const regex = new RegExp(ESCAPE_CHARACTER + d, 'g');
        return s.replace(regex, d);
}

}