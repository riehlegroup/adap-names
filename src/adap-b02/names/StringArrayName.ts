import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        if(delimiter) {
            this.delimiter = delimiter;
        }
        this.components = [...source];
    }

    private escapeComponents(components: string[]): string[] {
    return components.map(e => 
                e.replace(new RegExp(`\\${ESCAPE_CHARACTER}`, 'g'), ESCAPE_CHARACTER + ESCAPE_CHARACTER)

        )
    }

    private unescapeComponents(components: string[]): string[] {
    return components.map(e => 
                e.replace(new RegExp(`\\${ESCAPE_CHARACTER}`, 'g'), '')
        )
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.unescapeComponents(this.components).join(delimiter);
    }

    public asDataString(): string {
        return this.components.join(DEFAULT_DELIMITER);
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() == 0;
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        return this.components[i];
    }

    public setComponent(i: number, c: string): void {
        this.components[i] = this.escapeComponents([c])[0];
    }

    public insert(i: number, c: string): void {
       this.components.splice(i,0,this.escapeComponents([c])[0]);
    }

    public append(c: string): void {
        this.components.push(this.escapeComponents([c])[0]);
    }

    public remove(i: number): void {
        this.components.splice(i,1);
    }

    public concat(other: Name): void {
        let noComponents:number = other.getNoComponents();
        for (let i = 0; i < noComponents; i++) {
            this.components.push(other.getComponent(i));
        }
    }

}