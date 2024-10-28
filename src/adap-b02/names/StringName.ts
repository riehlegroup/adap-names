import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    protected name: string = "";
    protected length: number = 0;

    /** @methodtype initialization-method */
    constructor(other: string, delimiter?: string) {
        if (delimiter !== undefined){
            this.delimiter = delimiter;
        }
        this.name = other;
        this.length = this.name.length;
    }

    /** @methodtype conversion-method*/
    public asString(delimiter: string = this.delimiter): string {
        const escapedDelimiter = ESCAPE_CHARACTER.concat(delimiter);
        return this.name
            .split(this.delimiter)
            .map(component => component.replace(new RegExp(`\\${delimiter}`, "g"), escapedDelimiter))
            .join(delimiter);
    }

    /** @methodtype conversion-method*/
    public asDataString(): string {
        return this.name
            .split(this.delimiter)
            .map(component =>
                component
                    .replace(new RegExp(`\\${ESCAPE_CHARACTER}`, "g"), ESCAPE_CHARACTER + ESCAPE_CHARACTER)
                    .replace(new RegExp(`\\${DEFAULT_DELIMITER}`, "g"), ESCAPE_CHARACTER + DEFAULT_DELIMITER)
            )
            .join(DEFAULT_DELIMITER);
    }

    /** @methodtype boolean-query-method*/
    public isEmpty(): boolean {
        return this.name.length === 0;
    }

    /** @methodtype get-method */
    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    /** Returns number of components in Name instance
     * @methodtype get-method */
    public getNoComponents(): number {
        if (this.name === "") {
            return 0; 
        }
        return this.name.split(this.delimiter).length;
    }

    /** @methodtype get-method */
   public getComponent(x: number): string {
        const components = this.name.split(this.delimiter);
        if (x < 0 || x >= this.getNoComponents()){
            throw new Error ("Index out of bounds");
        }
        return components[x];
    }

    /** @methodtype set-method */
    public setComponent(n: number, c: string): void {
        const components = this.name.split(this.delimiter);
        if (n < 0 || n >= this.getNoComponents()){
            throw new Error ("Index out of bounds");
        }
        components[n] = c;
        this.name = components.join(this.delimiter);
    }

    /** @methodtype command-method */
    public insert(n: number, c: string): void {
        const components = this.name.split(this.delimiter);
        if (n < 0 || n >= this.getNoComponents()){
            throw new Error ("Index out of bounds");
        }
        components.splice(n, 0 ,c);
        this.name = components.join(this.delimiter);
    }

    /** @methodtype command-method */
    public append(c: string): void {
        this.name += this.delimiter + c;
    }

    /** @methodtype command-method */
    public remove(n: number): void {
        const components = this.name.split(this.delimiter);
        if (n < 0 || n >= this.getNoComponents()){
             throw new Error("Index out of bounds");
        }
        components.splice(n, 1);
        this.name = components.join(this.delimiter);
    }

     /** @methodtype command-method */
     public concat(other: Name): void {
        if (other instanceof StringName) {
            this.name += this.delimiter + other.name;
        } else {
            throw new Error("Name has invalid instance");
        }
    }

}