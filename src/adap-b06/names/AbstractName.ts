import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";


export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        IllegalArgumentException.assert(delimiter == null, "Delimiter is null or undefined");
        this.delimiter = delimiter;
        //throw new Error("needs implementation");
    }

    public clone(): Name {
        const cloned = {...this};

        return cloned;
        //throw new Error("needs implementation");
    }

    public asString(delimiter: string = this.delimiter): string {
        IllegalArgumentException.assert(delimiter != null, "Delimiter can not be a null value");
        const text: string[] = [];
        
        for (let i = 0; i < this.getNoComponents(); i++) {
            text.push(this.getComponent(i));
        }
        const result = text.join(delimiter);

        MethodFailedException.assert(result != null,"Result of asString is null");
        return result;
        //throw new Error("needs implementation");
    }

    public toString(): string {
        return this.asDataString();
        //throw new Error("needs implementation");
    }

    public asDataString(): string {
        const components: string[] = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            const component = this.getComponent(i);
            const replacedComponent = component.replaceAll(
                this.delimiter, 
                ESCAPE_CHARACTER + this.delimiter
            );
            components.push(replacedComponent);
        }
        const result = components.join(this.delimiter);
        
        MethodFailedException.assert(result != null, "Result of asDataString is null");

        return result;
        //throw new Error("needs implementation");
    }

    public isEqual(other: Name): boolean {
        InvalidStateException.assert(other==null, "Object is null or undefined")

        for (let i = 0; i < this.getNoComponents(); i++) {
            if (this.getComponent(i) != other.getComponent(i)) {
                return false;
            }
        }
        return true
        //throw new Error("needs implementation");
    }

    public getHashCode(): number {
        throw new Error("needs implementation");
    }

    public isEmpty(): boolean {
        return (this.getNoComponents() == 0);
        //throw new Error("needs implementation");
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
        //throw new Error("needs implementation");
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): Name;

    abstract insert(i: number, c: string): Name;
    abstract append(c: string): Name;
    abstract remove(i: number): Name;

    public concat(other: Name): Name {

        let res: Name = this.clone();
        IllegalArgumentException.assert(other != null && other.getDelimiterCharacter != this.getDelimiterCharacter, "Argument is null or delimiters dont match");

        for(let i = 0; i < other.getNoComponents(); i++){
            res.append(other.getComponent(i))
        }

        return res;
        //throw new Error("needs implementation");
    }

}