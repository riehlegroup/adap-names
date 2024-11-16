import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        super();
        throw new Error("needs implementation");
    }

    getNoComponents(): number {
        throw new Error("needs implementation");
    }

    getComponent(i: number): string {
        throw new Error("needs implementation");
    }
    setComponent(i: number, c: string) {
        throw new Error("needs implementation");
    }

    insert(i: number, c: string) {
        throw new Error("needs implementation");
    }
    append(c: string) {
        throw new Error("needs implementation");
    }
    remove(i: number) {
        throw new Error("needs implementation");
    }
}