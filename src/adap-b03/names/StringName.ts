import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(other: string, delimiter?: string) {
        super(delimiter);
        this.name = other;
        this.length = this.asStringArray().length;
    }

  private getDelimRegExp(delimiter: string = this.delimiter): RegExp {
    // Escape delimiter if it's a special regex character
    let escapedDelimiter: string = delimiter.replaceAll(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    let escapedEscapeCharacter: string = ESCAPE_CHARACTER.replaceAll(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); // I actually feel stupid doing this

    // RegExp to find all unescaped delimiter chars
    return new RegExp(`(?<!${escapedEscapeCharacter})${escapedDelimiter}`, 'g');
  }

  private asStringArray(): string[] {
    let reg: RegExp = this.getDelimRegExp();
    return this.name.split(reg);
  }
    public clone(): Name {
        throw new Error("needs implementation");
    }

    public asString(delimiter: string = this.delimiter): string {
        throw new Error("needs implementation");
    }

    public toString(): string {
        throw new Error("needs implementation");
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
        return this.length;
    }

    public getComponent(i: number): string {
        this.assertInBounds(i);
        return this.asStringArray()[i];
    }

    public setComponent(i: number, c: string) {
        this.assertInBounds(i);
        let components: string[] = this.asStringArray();
        components[i] = c;
        this.name = components.join(this.delimiter);
    }

    public insert(i: number, c: string) {
        this.assertInBounds(i);
        let components: string[] = this.asStringArray();
        components.splice(i, 0, c);
        this.name = components.join(this.delimiter);
        this.length += 1;
    }

    public append(c: string) {
        this.name += this.delimiter + c;
        this.length += 1;
    }

    public remove(i: number) {
        this.assertInBounds(i);
        let components: string[] = this.asStringArray();
        components.splice(i, 1);
        this.name = components.join(this.delimiter);
        this.length -= 1;
    }

    public concat(other: Name): void {
        throw new Error("needs implementation");
    }

}
