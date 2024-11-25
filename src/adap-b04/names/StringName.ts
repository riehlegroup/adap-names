import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(other: string, delimiter?: string) {
        super(delimiter);
        this.assertArgumentNotNullOrUndefined(other);
        this.name = other;

        this.noComponents = this.asStringArray().length;
    }

    private getDelimRegExp(delimiter: string = this.delimiter): RegExp {
        // Escape delimiter if it's a special regex character
        let escapedDelimiter: string = delimiter.replaceAll(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        let escapedEscapeCharacter: string = ESCAPE_CHARACTER.replaceAll(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

        // RegExp to find all unescaped delimiter chars
        return new RegExp(`(?<!${escapedEscapeCharacter})${escapedDelimiter}`, 'g');
    }

    private asStringArray(): string[] {
        let reg: RegExp = this.getDelimRegExp();
        return this.name.split(reg);
    }

    public getNoComponents(): number {
        let n: number = this.noComponents;

        this.assertReturnNotNullOrUndefined(n);
        return n;
    }

    public getComponent(i: number): string {
        this.assertIndexInBounds(i);

        let c: string = this.asStringArray()[i];

        this.assertReturnNotNullOrUndefined(c, "component");
        return c;
    }

    public setComponent(i: number, c: string) {
        this.assertIndexInBounds(i);
        this.assertIsValidComponent(c);

        let components: string[] = this.asStringArray();
        components[i] = c;
        this.name = components.join(this.delimiter);

        this.assertComponentEquals(i, c);
        this.assertClassInvariants();
    }

    public insert(i: number, c: string) {
        this.assertIndexInBoundsForInsert(i);
        this.assertIsValidComponent(c);

        let components: string[] = this.asStringArray();
        components.splice(i, 0, c);
        this.name = components.join(this.delimiter);
        let oldNoComponents: number = this.getNoComponents();
        this.noComponents = oldNoComponents + 1;

        this.assertComponentInserted(i, c, oldNoComponents);
        this.assertClassInvariants();
    }

    public append(c: string) {
        this.assertIsValidComponent(c);
        let oldNoComponents: number = this.getNoComponents();

        this.name += this.delimiter + c;
        this.noComponents += 1;

        this.assertComponentAppended(c, oldNoComponents)
    }

    public remove(i: number) {
        this.assertIndexInBounds(i);
        let oldNoComponents: number = this.getNoComponents();

        let components: string[] = this.asStringArray();
        components.splice(i, 1);
        this.name = components.join(this.delimiter);
        this.noComponents -= 1;

        this.assertComponentRemoved(oldNoComponents);
    }

}
