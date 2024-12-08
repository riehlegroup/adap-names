import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailureException } from "../common/MethodFailureException";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(other: string, delimiter?: string) {
        IllegalArgumentException.assertIsNotNullOrUndefined(other, "string is null or undefined");

        super(delimiter);
        this.name = other;
        this.noComponents = this.name.split(this.delimiter).length


        MethodFailureException.assertIsNotNullOrUndefined(this.name, "can not assigned the string");
        MethodFailureException.assertCondition(this.noComponents > 0, "number of components is zero");
        //throw new Error("needs implementation");
    }
    /*
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
        IllegalArgumentException.assertIsNotNullOrUndefined(this.noComponents, "number of components is null or undefined");
        return this.noComponents;

        //throw new Error("needs implementation");
    }

    public getComponent(i: number): string {
        IllegalArgumentException.assertCondition(i >= 0, "number is less than zero");

        const res = this.name.split(this.delimiter)[i];

        MethodFailureException.assertIsNotNullOrUndefined(res, "reached component is null or undefined")

        return res;
        //throw new Error("needs implementation");
    }

    public setComponent(i: number, c: string) {
        IllegalArgumentException.assertCondition(i > 0, "index number is less than zero");
        IllegalArgumentException.assertIsNotNullOrUndefined(c, "string is null or undefined");

        const components = this.name.split(this.delimiter);
        components[i] = c;
        this.name = components.join(this.delimiter);

        MethodFailureException.assertCondition(this.name.split(this.delimiter)[i] == c, "string can not be assigned");


        //throw new Error("needs implementation");
    }

    public insert(i: number, c: string) {
        IllegalArgumentException.assertCondition(i > 0, "index number is less than zero");
        IllegalArgumentException.assertIsNotNullOrUndefined(c, "string is null or undefined");

        const components = this.name.split(this.delimiter).splice(i,0,c);
        this.name = components.join(this.delimiter);

        MethodFailureException.assertCondition(this.name.split(this.delimiter)[i] == c, "string can not be inserted");

        //throw new Error("needs implementation");
    }

    public append(c: string) {
        IllegalArgumentException.assertIsNotNullOrUndefined(c, "string is null or undefined");

        this.name = this.name + this.delimiter + c;

        //throw new Error("needs implementation");
    }

    public remove(i: number) {
        IllegalArgumentException.assertCondition(i > 0, "index number is less than zero");

        const components = this.name.split(this.delimiter).splice(i,1);
        this.name = components.join(this.delimiter);

        MethodFailureException.assertCondition(this.noComponents + 1 == this.name.split(this.delimiter).length, "can not be removed")
        //throw new Error("needs implementation");
    }
/*
    public concat(other: Name): void {
        throw new Error("needs implementation");
    }
*/
}