import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    protected name: string = "";
    protected length: number = 0;

    constructor(other: string, delimiter?: string) {
        this.name = other;
        this.length = this.name.length
        if (delimiter != undefined){
            this.delimiter = delimiter
           }
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.name;
    }

    public asDataString(): string {
        let array = this.splitByDelimiter(this.name,this.delimiter);
        return this.arrayToString(array,ESCAPE_CHARACTER + this.delimiter);
    }

    public isEmpty(): boolean {
        if (this.name.length == 0 || this.name == undefined || this.name == null)
            return true
        else return false
    }

    public getDelimiterCharacter(): string {
        return this.delimiter
    }

    public getNoComponents(): number {
       const array = this.splitByDelimiter(this.name,this.delimiter);
       return array.length;
    }

    public getComponent(x: number): string {
        const array = this.splitByDelimiter(this.name,this.delimiter);
        return array[x];
    }

    public setComponent(n: number, c: string): void {
        let array = this.splitByDelimiter(this.name,this.delimiter);
        array[n] = c;
        this.name = this.arrayToString(array);
    }

    public insert(n: number, c: string): void {
        let array = this.splitByDelimiter(this.name,this.delimiter); 
        array.splice(n,0,c);
        this.name = this.arrayToString(array);
    }

    public append(c: string): void {
       this.name += (this.delimiter + c);
    }

    public remove(n: number): void {
        let array = this.splitByDelimiter(this.name,this.delimiter);
        array.splice(n,1)
        this.name = this.arrayToString(array);
    }

    public concat(other: Name): void {
        this.name += other.asString;
    }

    private splitByDelimiter(input:string,delimiter:string):string[]{
           return input.split(delimiter)
    }
    private arrayToString(array:string[],delimiter: string = this.delimiter): string {
        let name: string = ''

        array.forEach(element => {
            if (name.length == 0){
                name += element
            }else{
            name += delimiter
            name += element
            }
        });

        return name
    }
}