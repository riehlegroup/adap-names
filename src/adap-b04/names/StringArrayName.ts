import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { InvalidStateException } from "../common/InvalidStateException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailureException } from "../common/MethodFailureException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        super();
        super(delimiter);
        if (other == null || other == undefined) {
            throw new IllegalArgumentException("Argument must not be null or undefined");
        }
        this.components = other.map(s => this.notEscaped(s, this.delimiter));
    }

    public clone(): Name {
        return Object.create(this);
    }

    public asString(delimiter: string = this.delimiter): string {
        if (delimiter == null || delimiter.length != 1) {
            throw new IllegalArgumentException("Delimiter must be a single character");
        }
        return this.components.join(delimiter);
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        throw new Error("needs implementation");
    }

    public isEqual(other: Name): boolean {
        throw new Error("needs implementation");
    }

    public getHashCode(): number {
        throw new Error("needs implementation");
    }

    public isEmpty(): boolean {
        throw new Error("needs implementation");
    }

    public getDelimiterCharacter(): string {
        throw new Error("needs implementation");
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        if (i < 0 || i >= this.getNoComponents()) {
            throw new IllegalArgumentException("Index out of bounds");
        }
        let component = this.components[i];
        if (component == null || component == undefined) {
            throw new InvalidStateException("Component is null or undefined");
        }
        return component;
    }

    public setComponent(i: number, c: string) {
        this.checkMask(c);
        c = this.notEscaped(c, this.delimiter);
        if (i < 0 || i >= this.getNoComponents()) {
            throw new IllegalArgumentException("Index out of bounds");
        }
        if (c == undefined || c == null) {
            throw new IllegalArgumentException("Argument must not be null or undefined");
        } 
        this.components[i] = c;
        if (this.components[i] == undefined || this.components[i] == null || this.components[i] !== c) {
            throw new MethodFailureException("Set component failed");
        }
    }

    public insert(i: number, c: string) {
        this.checkMask(c);
        c = this.notEscaped(c, this.delimiter);

        let length = this.getNoComponents();
        if (i < 0 || i > this.getNoComponents()) {
            throw new IllegalArgumentException("Index out of bounds");
        }
        if (c == undefined || c == null) {
            throw new IllegalArgumentException("Argument must not be null or undefined");
        }

        this.components.splice(i, 0, c);

        if (this.components[i] == undefined || this.components[i] == null || this.components[i] !== c || this.getNoComponents() !== length + 1) {
            throw new MethodFailureException("Insert failed");
        }
    }

    public append(c: string) {
        this.checkMask(c);
        c = this.notEscaped(c, this.delimiter);
        let length = this.getNoComponents();
        if (c == undefined || c == null) {
            throw new IllegalArgumentException("Argument must not be null or undefined");
        }

        this.components.push(c);
        let lastComponent = this.components[this.getNoComponents() - 1];

        if (lastComponent == undefined || lastComponent == null || lastComponent !== c || this.getNoComponents() !== length + 1) {
            throw new MethodFailureException("Append failed");
        }
    }

    public remove(i: number) {
        let length = this.getNoComponents();
        if (i < 0 || i >= this.getNoComponents()) {
            throw new IllegalArgumentException("Index out of bounds");
        }

        this.components.splice(i, 1);

        if (this.getNoComponents() !== length - 1) {
            throw new MethodFailureException("Remove failed");
        }
    }

    public concat(other: Name): void {
        throw new Error("needs implementation");
    }
}