import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(other: string, delimiter?: string) {
        throw new Error("needs implementation or deletion");
    }

    public asString(delimiter: string = this.delimiter): string {
        throw new Error("needs implementation or deletion");
    }

    public asDataString(): string {
        throw new Error("needs implementation or deletion");
    }

    public getDelimiterCharacter(): string {
        throw new Error("needs implementation or deletion");
    }

    public isEmpty(): boolean {
        throw new Error("needs implementation or deletion");
    }

    public getNoComponents(): number {
        throw new Error("needs implementation or deletion");
    }

    public getComponent(x: number): string {
        throw new Error("needs implementation or deletion");
    }

    public setComponent(n: number, c: string): void {
        throw new Error("needs implementation or deletion");
    }

    public insert(n: number, c: string): void {
        throw new Error("needs implementation or deletion");
    }

    public append(c: string): void {
        throw new Error("needs implementation or deletion");
    }

    public remove(n: number): void {
        throw new Error("needs implementation or deletion");
    }

    public concat(other: Name): void {
        throw new Error("needs implementation or deletion");
    }

}