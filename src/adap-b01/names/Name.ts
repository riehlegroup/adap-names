export class Name {

    public readonly DEFAULT_DELIMITER: string = '.';
    private readonly ESCAPE_CHARACTER = '\\';

    private components: string[] = [];
    private delimiter: string = this.DEFAULT_DELIMITER;

    // @methodtype initialization-method
    constructor(other: string[], delimiter?: string) {
        this.components = other
        if (delimiter != undefined) {
            this.delimiter = delimiter;
        }
    }

    // @methodtype conversion-method
    public asNameString(delimiter: string = this.delimiter): string {
        return this.components.join(delimiter);
    }
    
    // @methodtype get-method
    public getComponent(i: number): string {
        return this.components[i];
    }
    
    // @methodtype set-method
    public setComponent(i: number, c: string): void {
        this.components[i] = c;
    }

    // @methodtype get-method
    public getNoComponents(): number {
        return this.components.length;
    }

    // @methodtype command-method
    public insert(i: number, c: string): void {
        this.components.splice(i, 0, c)
    }
    
    // @methodtype command-method
    public append(c: string): void {
        this.components.push(c);
    }

    // @methodtype command-method
    public remove(i: number): void {
        this.components.splice(i, 1);
    }

}
