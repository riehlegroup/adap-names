import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        this.name = source;
        if(delimiter) {
            this.delimiter = delimiter;
        }
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.name;
    }

    public asDataString(): string {
        return (this.delimiter.split(this.name)).join(DEFAULT_DELIMITER);
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() == 0;
    }

    public getNoComponents(): number {
        return (this.delimiter.split(this.name).length);
    }

    public getComponent(x: number): string {
        return this.delimiter.split(this.name)[x];
    }

    public setComponent(n: number, c: string): void {
        let tmp:string[] = this.name.split(this.delimiter);
        tmp[n] = c;
        this.name = tmp.join(this.delimiter);
    }

    public insert(n: number, c: string): void {
        let tmp:string[] = this.name.split(this.delimiter);
        tmp.splice(n,0,c);
        this.name = tmp.join(this.delimiter);
    }

    public append(c: string): void {
        let tmp:string[] = this.name.split(this.delimiter);
        tmp.push(c);
        this.name = tmp.join(this.delimiter);
    }

    public remove(n: number): void {
        let tmp:string[] = this.name.split(this.delimiter);
        tmp.splice(n,1);
        this.name = tmp.join(this.delimiter);
    }

    public concat(other: Name): void {
        let tmp:string[] = this.name.split(this.delimiter);
        let noComponents:number = other.getNoComponents();
        for (let i = 0; i < noComponents; i++) {
            tmp.push(other.getComponent(i));
        }
        this.name = tmp.join(this.delimiter);
    }

}