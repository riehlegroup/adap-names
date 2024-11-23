import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(other: string, delimiter?: string) {
        super(delimiter);
        this.name = other;
        this.length = this.splitComponents(this.name).length;
    }

    asDataString(): string {
        return this.name;
    }

    asString(delimiter: string = this.delimiter): string {
        return this.splitComponents(this.name).map(s => this.notEscaped(s, this.delimiter)).join(delimiter);
    }


    getNoComponents(): number {
        return this.length;
    }

    getComponent(i: number): string {
        if (i < 0 || i >= this.length) {
            throw new Error("Index out of Bounds");
        }
        return this.splitComponents(this.name)[i];
    }

    setComponent(i: number, c: string) {
        if (i < 0 || i >= this.length) {
            throw new Error("Index out of Bounds");
        }
        let items = this.splitComponents(this.name);
        items[i] = c;
        this.name = items.join(this.delimiter);
    }

    insert(i: number, c: string) {
        if (i < 0 || i > this.length) {
            throw new Error("Index out of Bounds");
        }
        let items = this.splitComponents(this.name);
        items.splice(i, 0, c);
        this.name = items.join(this.delimiter);
        this.length += 1;
    }

    append(c: string) {
        let items = this.splitComponents(this.name);
        items.push(c);
        this.name = items.join(this.delimiter);
        this.length += 1;
    }

    remove(i: number) {
        if (i < 0 || i >= this.length) {
            throw new Error("Index out of Bounds");
        }
        let items = this.splitComponents(this.name);
        items.splice(i, 1);
        this.name = items.join(this.delimiter);
        this.length -= 1;
    }

    /** @methodtype helper-method */
    private splitComponents(s: string): string[] {
        let components: string[] = [];
        let current = "";
        let isEscaped = false;

        for (const char of s) {
            if (char === ESCAPE_CHARACTER) {
                if (isEscaped) {
                    // Double escape: add one escape character
                    current += ESCAPE_CHARACTER;
                    isEscaped = false;
                } else {
                    // Start escaping
                    isEscaped = true;
                }
            } else if (char === this.delimiter && !isEscaped) {
                // Add the current component and reset for the next one
                components.push(current);
                current = "";
            } else {
                // Regular character or escaped character
                current += char;
                isEscaped = false;
            }
        }

        // Add the final component
        components.push(current);
        return components;
}
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

    

    public concat(other: Name): void {
        throw new Error("needs implementation");
    }


}