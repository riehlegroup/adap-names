import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        super();
        this.components = other
    }

    getNoComponents(): number {
        return this.components.length
    }

    getComponent(i: number): string {
        if (i >= 0 && i < this.components.length) {
            return this.components[i];
        }
        return "";
    }
    setComponent(i: number, c: string) {
        this.components.splice(i,1,c);
    }

    insert(i: number, c: string) {
        this.components.splice(i,0,c);
    }
    append(c: string) {
        this.components.push(c);
    }
    remove(i: number) {
        this.components.splice(i,1)
    }
}