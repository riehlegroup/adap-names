export class Name {

    public readonly DEFAULT_DELIMITER: string = '.';
    private readonly ESCAPE_CHARACTER = '\\';

    private components: string[] = [];
    private delimiter: string = this.DEFAULT_DELIMITER;

    constructor(other: string[], delimiter?: string) {
       this.components = other
       if (delimiter != undefined){
        this.delimiter = delimiter
       }
    }

    /** Returns human-readable representation of Name instance */
    public asNameString(delimiter: string = this.delimiter): string {
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

    public getComponent(i: number): string {
        if (i >= 0 && i < this.components.length) {
            return this.components[i];
        }
        return "";
    }

    public setComponent(i: number, c: string): void {
        this.components.splice(i,1,c)
    }

    public getNoComponents(): number {
        return this.components.length
    }

    public insert(i: number, c: string): void {
        this.components.splice(i,0,c)
    }

    public append(c: string): void {
        this.components.push(c)
    }

    public remove(i: number): void {
        this.components.splice(i,1)
    }

}