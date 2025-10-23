import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        if(delimiter) {
            this.delimiter = delimiter;
        }
        this.name = source;
    }

    private asArray(delimiter: string = this.delimiter): string[] {
        // RegEx Magic: ?< negative lookbehind, ! not| \\\\ -> \\ 
        // --> negative lookbehind not \\ = ?< ! \\ \\
        // Then just \. -> \\.
        return this.name.split(new RegExp(`(?<!\\\\)\\${delimiter}`));
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.asArray(this.delimiter).join(delimiter);
    }

    public asDataString(): string {
        return (this.asArray(this.delimiter)).join(DEFAULT_DELIMITER);
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() == 0;
    }

    public getNoComponents(): number {
        return this.asArray().length;
    }

    public getComponent(x: number): string {
        return this.asArray()[x];
    }

    public setComponent(n: number, c: string): void {
        let tmp:string[] = this.asArray();
        tmp[n] = c;
        this.name = tmp.join(this.delimiter);
    }

    public insert(n: number, c: string): void {
        let tmp:string[] = this.asArray();
        tmp.splice(n,0,c);
        this.name = tmp.join(this.delimiter);
    }

    public append(c: string): void {
        let tmp:string[] = this.asArray();
        tmp.push(c);
        this.name = tmp.join(this.delimiter);
    }

    public remove(n: number): void {
        let tmp:string[] = this.asArray();
        tmp.splice(n,1);
        this.name = tmp.join(this.delimiter);
    }

    public concat(other: Name): void {
        let tmp:string[] = this.asArray();
        let noComponents:number = other.getNoComponents();
        for (let i = 0; i < noComponents; i++) {
            tmp.push(other.getComponent(i));
        }
        this.name = tmp.join(this.delimiter);
    }

}