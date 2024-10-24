export class Name {

    public readonly DEFAULT_DELIMITER: string = '.';
    private readonly ESCAPE_CHARACTER = '\\';

    private components: string[] = [];
    private delimiter: string = this.DEFAULT_DELIMITER;

    constructor(other: string[], delimiter?: string) {
        throw new Error("needs implementation");
    }

    /** Returns human-readable representation of Name instance */
    public asNameString(delimiter: string = this.delimiter): string {
        throw new Error("needs implementation");
    }

    public getComponent(i: number): string {
        throw new Error("needs implementation");
    }

    public setComponent(i: number, c: string): void {
        throw new Error("needs implementation");
    }

     /** Returns number of components in Name instance */
     public getNoComponents(): number {
        throw new Error("needs implementation");
    }

    public insert(i: number, c: string): void {
        throw new Error("needs implementation");
    }

    public append(c: string): void {
        throw new Error("needs implementation");
    }

    public remove(i: number): void {
        throw new Error("needs implementation");
    }

}