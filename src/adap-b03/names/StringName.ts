import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected length: number = 0;

    constructor(other: string, delimiter?: string) {
        super();
        this.name = other;
        this.length = this.name.length
    }

    getNoComponents(): number {
        const array = this.splitByDelimiter(this.name,this.delimiter);
       return array.length;
    }

    getComponent(i: number): string {
        const array = this.splitByDelimiter(this.name,this.delimiter);
        return array[i];
    }
    setComponent(i: number, c: string) {
        let array = this.splitByDelimiter(this.name,this.delimiter);
        array[i] = c;
        this.name = this.arrayToString(array);
    }

    insert(i: number, c: string) {
        let array = this.splitByDelimiter(this.name,this.delimiter); 
        array.splice(i,0,c);
        this.name = this.arrayToString(array);
    }
    append(c: string) {
        this.name += (this.delimiter + c);
    }
    remove(i: number) {
        let array = this.splitByDelimiter(this.name,this.delimiter);
        array.splice(i,1)
        this.name = this.arrayToString(array);
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