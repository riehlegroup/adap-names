import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailureException } from "../common/MethodFailureException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        
        IllegalArgumentException.assertIsNotNullOrUndefined(other, "string is null or undefined");
        super(delimiter);
        this.components = other;
        
        //throw new Error("needs implementation");

    }
    /**    
    public clone(): Name {
        throw new Error("needs implementation");
    }

    public asString(delimiter: string = this.delimiter): string {
        throw new Error("needs implementation");
    }

    public toString(): string {
        throw new Error("needs implementation");
    }

    public asDataString(): string {
        throw new Error("needs implementation");
    }

    public isEqual(other: Name): boolean {
        throw new Error("needs implementation");
    }

    public getHashCode(): number {
        throw new Error("needs implementation");
    }

    public isEmpty(): boolean {
        throw new Error("needs implementation");
    }

    public getDelimiterCharacter(): string {
        throw new Error("needs implementation");
    }
    */
    public getNoComponents(): number {
        const res = this.components.length;

        MethodFailureException.assertCondition(res >= 0, "number of components is equal or less than zero");

        return res;
        //throw new Error("needs implementation");
    }

    public getComponent(i: number): string {
        const res = this.components[i];
        MethodFailureException.assertIsNotNullOrUndefined(res, "component can not be reached");

        return res;

        //throw new Error("needs implementation");
    }

    public setComponent(i: number, c: string) {
        IllegalArgumentException.assertCondition(i <= this.components.length, "number exceeds the component size");
        IllegalArgumentException.assertIsNotNullOrUndefined(c, "string is null or undefined");

        this.components[i] = c;

        MethodFailureException.assertCondition(this.components[i] == c, "Can not set the component");
        
        //throw new Error("needs implementation");
    }

    public insert(i: number, c: string) {
        IllegalArgumentException.assertIsNotNullOrUndefined(c, "string is null or undefined");

        const length = this.components.length;
        this.components.splice(i,0,c);
        
        MethodFailureException.assertCondition(length + 1 == this.components.length, "Can not be inserted")

        //throw new Error("needs implementation");
    }

    public append(c: string) {
        IllegalArgumentException.assertIsNotNullOrUndefined(c, "string is null or undefined");

        const length = this.components.length;
        this.components.push(c);

        MethodFailureException.assertCondition(length === this.components.length, "new array can not be created");
        MethodFailureException.assertCondition(this.components[length + 1] === c, "string can not be pushed");

        //throw new Error("needs implementation");
    }

    public remove(i: number) {
        IllegalArgumentException.assertIsNotNullOrUndefined(i, "number is null or undefined");
        
        const length = this.components.length;
        this.components.splice(i,1);

        MethodFailureException.assertCondition(length - 1 == this.components.length, "Can not be deleted")

        //throw new Error("needs implementation");
    }
    /**
    public concat(other: Name): void {
        throw new Error("needs implementation");
    }
    */
}