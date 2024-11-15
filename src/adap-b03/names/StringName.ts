import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {
  protected name: string = "";
  protected length: number = 0;

  /** @methodtype object creation-method */
  constructor(other: string, delimiter?: string) {
    if (delimiter) {
      super(delimiter);
    } else {
      super();
    }
    if (other) {
      this.name = other;
      const regex = new RegExp(
        `(?<!\\${ESCAPE_CHARACTER})\\${this.delimiter}`,
        "g"
      );
      let componentsWithDelimSplit = this.name.split(regex);
      this.length = componentsWithDelimSplit.length;
    }
  }

  /** @methodtype get-method */
  getNoComponents(): number {
    return this.length;
  }

  /** @methodtype get-method */
  getComponent(i: number): string {
    const regex = new RegExp(
      `(?<!\\${ESCAPE_CHARACTER})\\${this.delimiter}`,
      "g"
    );
    let arrayOfComponents = this.name.split(regex);
    return arrayOfComponents[i];
  }

  /** @methodtype set-method */
  setComponent(i: number, c: string) {
    const regex = new RegExp(
      `(?<!\\${ESCAPE_CHARACTER})\\${this.delimiter}`,
      "g"
    );
    let arrayOfComponents = this.name.split(regex);
    arrayOfComponents[i] = c;
    this.name = arrayOfComponents.join(this.delimiter);
  }

  /** @methodtype command-method */
  insert(i: number, c: string) {
    const regex = new RegExp(
      `(?<!\\${ESCAPE_CHARACTER})\\${this.delimiter}`,
      "g"
    );
    let arrayOfComponents = this.name.split(regex);

    arrayOfComponents.splice(i, 0, c);
    this.name = arrayOfComponents.join(this.delimiter);
    this.length++;
  }

  /** @methodtype command-method */
  append(c: string) {
    this.name += this.delimiter + c;
    this.length++;
  }

  /** @methodtype command-method */
  remove(i: number) {
    const regex = new RegExp(
      `(?<!\\${ESCAPE_CHARACTER})\\${this.delimiter}`,
      "g"
    );
    let arrayOfComponents = this.name.split(regex);
    arrayOfComponents.splice(i, 1);
    this.name = arrayOfComponents.join(this.delimiter);
    this.length--;
  }
}
