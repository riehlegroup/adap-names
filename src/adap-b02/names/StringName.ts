import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringName implements Name {
  protected delimiter: string = DEFAULT_DELIMITER;

  protected name: string = "";
  protected length: number = 0;

  /** @methodtype object creation-method */
  constructor(other: string, delimiter?: string) {
    if (delimiter) {
      this.delimiter = delimiter;
    }
    if (other) {
      this.name = other;
      const regex = new RegExp(`(?<!\\${ESCAPE_CHARACTER})\\${this.delimiter}`);
      let componentsWithDelimSplit = this.name.split(regex);;
      this.length = componentsWithDelimSplit.length;
    }
  }

  /** @methodtype conversion-method */
  public asString(delimiter: string = this.delimiter): string {
    const regex = new RegExp(`(?<!\\${ESCAPE_CHARACTER})\\${this.delimiter}`);
    let arrayOfComponents = this.name.split(regex);
    for (let index = 0; index < arrayOfComponents.length; index++) {
      arrayOfComponents[index] = arrayOfComponents[index].replace(ESCAPE_CHARACTER + this.delimiter, this.delimiter);
    }
    const result = arrayOfComponents.join(delimiter);
    return result;
  }
  /** @methodtype conversion-method */
  public asDataString(): string {
    return this.name;
  }

  /** @methodtype boolean query-method */
  public isEmpty(): boolean {
    return !this.name;
  }

  /** @methodtype get-method */
  public getDelimiterCharacter(): string {
    return this.delimiter;
  }

  /** @methodtype get-method */
  public getNoComponents(): number {
    return this.length;
  }

  /** @methodtype get-method */
  public getComponent(x: number): string {
    const regex = new RegExp(`(?<!\\${ESCAPE_CHARACTER})\\${this.delimiter}`);
    let arrayOfComponents = this.name.split(regex);
    return arrayOfComponents[x];
  }

  /** @methodtype set-method */
  public setComponent(n: number, c: string): void {
    const regex = new RegExp(`(?<!\\${ESCAPE_CHARACTER})\\${this.delimiter}`);
    let arrayOfComponents = this.name.split(regex);
    arrayOfComponents[n] = c;
    this.name = arrayOfComponents.join(this.delimiter);
  }

  /** @methodtype command-method */
  public insert(n: number, c: string): void {
    const regex = new RegExp(`(?<!\\${ESCAPE_CHARACTER})\\${this.delimiter}`);
    let arrayOfComponents = this.name.split(regex);

    arrayOfComponents.splice(n, 0, c);
    this.name = arrayOfComponents.join(this.delimiter);
    this.length++;
  }

  /** @methodtype command-method */
  public append(c: string): void {
    this.name += this.delimiter + c;
    this.length++;
  }

  /** @methodtype command-method */
  public remove(n: number): void {
    const regex = new RegExp(`(?<!\\${ESCAPE_CHARACTER})\\${this.delimiter}`);
    let arrayOfComponents = this.name.split(regex);
    arrayOfComponents.splice(n, 1);
    this.name = arrayOfComponents.join(this.delimiter);
    this.length--;
  }

  /** @methodtype command-method */
  public concat(other: Name): void {
    for (let i = 0; i < other.getNoComponents(); i++) {
      this.append(other.getComponent(i));
    }
  }
}
