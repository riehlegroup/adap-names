import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    protected name: string = "";
    protected length: number = 0; // Number of components in Name instance

    constructor(other: string, delimiter?: string) {
        throw new Error("needs implementation");
    }

    public asNameString(delimiter: string = this.delimiter): string {
        throw new Error("needs implementation");
    }

    public isEmpty(): boolean {
        throw new Error("needs implementation");
    }

    public getNoComponents(): number {
        throw new Error("needs implementation");
    }

    public getComponent(x: number): string {
        throw new Error("needs implementation");
    }

    public setComponent(n: number, c: string): void {
        throw new Error("needs implementation");
    }

    public insert(n: number, c: string): void {
        throw new Error("needs implementation");
    }

    public append(c: string): void {
        throw new Error("needs implementation");
    }

    public remove(n: number): void {
        throw new Error("needs implementation");
    }

    public concat(other: Name): void {
        throw new Error("needs implementation");
    }

}