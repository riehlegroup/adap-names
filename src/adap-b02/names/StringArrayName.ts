import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringArrayName implements Name {

    protected components: string[] = [];
    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(other: string[], delimiter?: string) {
        this.components = other
        if (delimiter != undefined){
         this.delimiter = delimiter
        }
    }

    public asString(delimiter: string = this.delimiter): string {
        let name: string = ''

        this.components.forEach(element => {
            if (name.length == 0){
                name += element
            }else{
            name += delimiter
            name += element
            }
        });

        return name
    }

    public asDataString(): string {
        return this.asString(ESCAPE_CHARACTER + this.delimiter)
    }

    public isEmpty(): boolean {
        if(this.components.length == 0)return true
        else return false 
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {
       /* let i = 0;
        this.components.forEach(element => {
            if(element != "" && element != undefined && element != null)
                i++;
        });
        return i */
        return this.components.length
    }

    public getComponent(i: number): string {
        if (i >= 0 && i < this.components.length) {
            return this.components[i];
        }
        return "";
    }

    public setComponent(i: number, c: string): void {
        this.components.splice(i,1,c);
    }

    public insert(i: number, c: string): void {
        this.components.splice(i,0,c);
    }

    public append(c: string): void {
        this.components.push(c);
    }

    public remove(i: number): void {
        this.components.splice(i,1)
    }

    public concat(other: Name): void {
       for (let i = 1; i <= other.getNoComponents(); i++) {
        this.append( other.getComponent(i))
    }
    }
}