import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected length: number = 0;

    constructor(other: string, delimiter?: string) {
        super(delimiter);
        this.name = other;
        this.length = this.asStringArray().length;
    }

  private getDelimRegExp(delimiter: string = this.delimiter): RegExp {
    // Escape delimiter if it's a special regex character
    let escapedDelimiter: string = delimiter.replaceAll(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    let escapedEscapeCharacter: string = ESCAPE_CHARACTER.replaceAll(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); // I actually feel stupid doing this

    // RegExp to find all unescaped delimiter chars
    return new RegExp(`(?<!${escapedEscapeCharacter})${escapedDelimiter}`, 'g');
  }

  private asStringArray(): string[] {
    let reg: RegExp = this.getDelimRegExp();
    return this.name.split(reg);
  }
    getNoComponents(): number {
        return this.length;
    }

    getComponent(i: number): string {
        this.assertInBounds(i);
        return this.asStringArray()[i];
    }
    setComponent(i: number, c: string) {
        this.assertInBounds(i);
        let components: string[] = this.asStringArray();
        components[i] = c;
        this.name = components.join(this.delimiter);
    }

    insert(i: number, c: string) {
        this.assertInBounds(i);
        let components: string[] = this.asStringArray();
        components.splice(i, 0, c);
        this.name = components.join(this.delimiter);
        this.length += 1;
    }
    append(c: string) {
        this.name += this.delimiter + c;
        this.length += 1;
    }
    remove(i: number) {
        this.assertInBounds(i);
        let components: string[] = this.asStringArray();
        components.splice(i, 1);
        this.name = components.join(this.delimiter);
        this.length -= 1;
    }
}
