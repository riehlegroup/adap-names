import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { InvalidStateException } from "../common/InvalidStateException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailureException } from "../common/MethodFailureException";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;
    private empty: boolean = true;

    constructor(other: string, delimiter?: string) {
        super(delimiter);
        if (other == undefined || other == null) {
            throw new IllegalArgumentException("Argument must not be null or undefined");
        }

        this.name = other;
        this.empty = false;
        this.noComponents = this.splitComponents(other).length;
   
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(i: number): string {
        if (i < 0 || i >= this.getNoComponents()) {
            throw new IllegalArgumentException("Index out of bounds");
        }
        let components = this.splitComponents(this.name);
        let component = components[i];
        if (component == undefined || component == null) {
            throw new InvalidStateException("Component is null or undefined");
        }

        return this.notEscaped(component, this.delimiter);
    }

    public setComponent(i: number, c: string) {
        this.checkMask(c);
        if (i < 0 || i >= this.getNoComponents()) {
            throw new IllegalArgumentException("Index out of bounds");
        }
        if (c == undefined || c == null) {
            throw new IllegalArgumentException("Argument must not be null or undefined");
        }

        let components = this.splitComponents(this.name);
        components[i] = c;

        this.name = components.join(this.delimiter);

        if (this.getComponent(i) == undefined || this.getComponent(i) == null || this.getComponent(i) !== c) {
            throw new MethodFailureException("Set Component failed");
        }
    }

    public insert(i: number, c: string) {
        this.checkMask(c);

        if (c == undefined || c == null) {
            throw new IllegalArgumentException("Argument must not be null or undefined");
        }

        if (i < 0 || i > this.getNoComponents()) {
            throw new IllegalArgumentException("Index out of bounds");
        }

        let components = this.splitComponents(this.name);
        components.splice(i, 0, c);
        this.name = components.join(this.delimiter);

        if (this.getComponent(i) !== c) {
            throw new MethodFailureException("Insert failed");
        }

        this.noComponents += 1;
        if (this.getNoComponents() !== components.length) {
            throw new MethodFailureException("Insert failed");
        }

        this.empty = false;

    }

    public append(c: string) {
        this.checkMask(c);
        if (c == undefined || c == null) {
            throw new IllegalArgumentException("Argument must not be null or undefined");
        }
        let components = this.splitComponents(this.name);
        components.push(c);
        this.name = components.join(this.delimiter);
        this.noComponents += 1;
        this.empty = false;
        let lastComponent = this.getComponent(this.getNoComponents() - 1);
        if (lastComponent == undefined || lastComponent == null || lastComponent !== c) {
            throw new MethodFailureException("Append failed");
        }
        if (this.getNoComponents() !== components.length) {
            throw new MethodFailureException("Append failed");
        }
    }

    public remove(i: number) {
        if (i < 0 || i >= this.getNoComponents()) {
            throw new IllegalArgumentException("Index out of bounds");
        }
        let components = this.splitComponents(this.name);
        components.splice(i, 1);
        this.name = components.join(this.delimiter);
        this.noComponents -= 1;
        if (this.getNoComponents() !== components.length) {
            throw new MethodFailureException("Remove failed");
        }

        if (this.getNoComponents() === 0) {
            this.empty = true;
        }
    }

    public concat(other: Name): void {
        super.concat(other);
        this.empty = false;
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

}