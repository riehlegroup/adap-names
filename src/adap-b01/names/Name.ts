export class Name {

    public readonly DEFAULT_DELIMITER: string = '.';
    private readonly ESCAPE_CHARACTER = '\\';

    private components: string[] = [];
    private delimiter: string = this.DEFAULT_DELIMITER;

    constructor(other: string[], delimiter?: string) {
        throw new Error("needs implementation");
    }

    public asNameString(delimiter: string = this.delimiter): string {
        return "oss.cs.fau.de";
    }

    public getComponent(i: number): string {
        return "oss.cs.fau.de";
    }

    public setComponent(i: number, c: string): void {
        throw new Error("needs implementation");
    }

    public getNoComponents(): number {
        return 1;
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