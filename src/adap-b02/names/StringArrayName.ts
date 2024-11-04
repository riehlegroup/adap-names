import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringArrayName implements Name {

    protected components: string[] = [];
    protected delimiter: string = DEFAULT_DELIMITER;

    /** @methodtype initialization-method */
    constructor(other: string[], delimiter?: string) {
        if (delimiter !== undefined){
            this.delimiter = delimiter;
        }
        this.components = other;
    }

    /** @methodtype conversion-method*/
    public asString(delimiter: string = this.delimiter): string {
        return this.components.join(delimiter);
    }

    /** @methodtype conversion-method*/
    public asDataString(): string {
        return this.components
            .map((component) => {
                return component
                    .replace(new RegExp(`\\${ESCAPE_CHARACTER}`, "g"), ESCAPE_CHARACTER + ESCAPE_CHARACTER)
                    .replace(new RegExp(`\\${DEFAULT_DELIMITER}`, "g"), ESCAPE_CHARACTER + DEFAULT_DELIMITER);
            })
            .join(DEFAULT_DELIMITER);
    }

    /** @methodtype boolean-query-method*/
    public isEmpty(): boolean {
        return this.components.length === 0;
    }

    /** @methodtype get-method */
    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    /** Returns number of components in Name instance
     * @methodtype get-method */
    public getNoComponents(): number {
        return this.components.length;
    }

    /** @methodtype get-method */
   public getComponent(i: number): string {
        if (i < 0 || i >= this.getNoComponents()){
            throw new Error ("Index out of bounds");
        }
        return this.components[i];
    }

    /** @methodtype set-method */
    public setComponent(i: number, c: string): void {
        if (i < 0 || i>= this.getNoComponents()){
            throw new Error ("Index out of bounds");
        }
        this.components[i] = c;
    }

    /** @methodtype command-method */
    public insert(i: number, c: string): void {
        if (i < 0 || i >= this.getNoComponents()){
            throw new Error ("Index out of bounds");
        }
        this.components.splice(i, 0 ,c);
    }

    /** @methodtype command-method */
    public append(c: string): void {
        this.components.push(c);
    }

    /** @methodtype command-method */
    public remove(i: number): void {
        if (i < 0 || i >= this.getNoComponents()){
             throw new Error("Index out of bounds");
        }
        this.components.splice(i, 1);
    }

    /** @methodtype command-method */
    public concat(other: Name): void {
        if (other instanceof StringArrayName) {
            this.components = [...this.components, ...other.components];
        } else {
            throw new Error("Name has invalid instance");
        }
    }

}