export class Name {
    public readonly DEFAULT_DELIMITER: string = '.';
    private readonly ESCAPE_CHARACTER = '\\';

    private components: string[] = [];
    private delimiter: string = this.DEFAULT_DELIMITER;


    constructor(other: string[], delimiter?: string) {
        this.components = other;
        if (delimiter) {
            this.delimiter = delimiter;
        }
    }

    /** @methodtype get-method */
    public asNameString(delimiter: string = this.delimiter): string {
        return this.components
            .map(component => component.replace(this.delimiter, this.ESCAPE_CHARACTER + delimiter))
            .join(delimiter);
    }

    /** @methodtype get-method */
    public getComponent(i: number): string {
        this.checkIndexBounds(i, false);
        return this.components[i];
    }

    /** @methodtype set-method */
    public setComponent(i: number, c: string): void {
        this.checkIndexBounds(i, false);
        this.components[i] = c;
    }

    /** @methodtype get-method */
    public getNoComponents(): number {
        return this.components.length;
    }

    /** @methodtype insert-method */
    public insert(i: number, c: string): void {
        this.checkIndexBounds(i, true);
        this.components.splice(i, 0, c);
    }

    /** @methodtype append-method */
    public append(c: string): void {
        this.components.push(c);
    }

    /** @methodtype remove-method */
    public remove(i: number): void {
        this.checkIndexBounds(1, false);
        this.components.splice(i, 1);
    }
    private checkIndexBounds(index: number, canInsertAtEnd: boolean = false): void {
        const upperBound = canInsertAtEnd ? this.components.length : this.components.length - 1;
        if (index < 0 || index > upperBound) {
            throw new Error(`Index ${index} is out of bounds. Allowed range: 0 to ${upperBound}.`);
        }
    }

}
