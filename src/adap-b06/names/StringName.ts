import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(other: string, delimiter?: string) {
        IllegalArgumentException.assert(other != null, "string is null");

        super(delimiter);
        this.name = other;
        this.noComponents = this.name.split(this.delimiter).length


        MethodFailedException.assert(this.name != null, "can not assigned the string");
        MethodFailedException.assert(this.noComponents > 0, "number of components is zero");
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
        IllegalArgumentException.assert(this.noComponents >= 0, "number of components can not be less than zero");
        return this.noComponents;

        //throw new Error("needs implementation");
    }

    public getComponent(i: number): string {
        IllegalArgumentException.assert(i >= 0, "number is less than zero");

        const res = this.name.split(this.delimiter)[i];

        MethodFailedException.assert(res != null, "reached component is null")

        return res;
        //throw new Error("needs implementation");
    }

    public setComponent(i: number, c: string) : Name {
        IllegalArgumentException.assert(i > 0, "index number is less than zero");
        IllegalArgumentException.assert(c != null, "string is null or undefined");

        const components = this.name.split(this.delimiter);
        components[i] = c;
        let name = components.join(this.delimiter);

        MethodFailedException.assert(name.split(this.delimiter)[i] == c, "string can not be assigned");

        return new StringName(name, this.delimiter);
        //throw new Error("needs implementation");
    }

    public insert(i: number, c: string) : Name {
        IllegalArgumentException.assert(i > 0, "index number is less than zero");
        IllegalArgumentException.assert(c != null, "string is null");

        const components = this.name.split(this.delimiter).splice(i,0,c);
        let name = components.join(this.delimiter);

        MethodFailedException.assert(name.split(this.delimiter)[i] == c, "string can not be inserted");

        return new StringName(name, this.delimiter);
        //throw new Error("needs implementation");
    }

    public append(c: string) : Name{
        IllegalArgumentException.assert(c != null, "string is null");

        let name = this.name + this.delimiter + c;

        return new StringName(name, this.delimiter);
        //throw new Error("needs implementation");
    }

    public remove(i: number) : Name {
        IllegalArgumentException.assert(i > 0, "index number is less than zero");

        const components = this.name.split(this.delimiter).splice(i,1);
        let name = components.join(this.delimiter);

        MethodFailedException.assert(this.noComponents + 1 == name.split(this.delimiter).length, "can not be removed");
        return new StringName(name, this.delimiter);
        //throw new Error("needs implementation");
    }
/*
    public concat(other: Name): void {
        throw new Error("needs implementation");
    }
*/
}