import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringName implements Name {
  protected delimiter: string = DEFAULT_DELIMITER;

  protected name: string = "";
  protected length: number = 0;

  /** @methodtype object creation-method */
  constructor(other: string, delimiter?: string) {
    if (other) {
      this.name = other;
    }
    if (delimiter) {
      this.delimiter = delimiter;
    }
  }

  /** @methodtype conversion-method */
  public asString(delimiter: string = this.delimiter): string {
    let nameWithOldDelim = this.name;
    const ESCAPED_DELIM_PLACEHOLDER = ESCAPE_CHARACTER;
    nameWithOldDelim = nameWithOldDelim.replaceAll(
      ESCAPE_CHARACTER + this.delimiter,
      ESCAPED_DELIM_PLACEHOLDER
    );// Not fully perfect
    nameWithOldDelim = nameWithOldDelim.replaceAll(this.delimiter, delimiter);
    nameWithOldDelim = nameWithOldDelim.replaceAll(
      ESCAPED_DELIM_PLACEHOLDER,
      this.delimiter
    );

    return nameWithOldDelim;
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
    let amountOfComponentsWithEscapedDelim =
      this.name.split(ESCAPE_CHARACTER + this.delimiter).length || 0;
    let amountOfComponentsWithDelim =
      this.name.split(this.delimiter).length || 0;
    let totalAmount =
      amountOfComponentsWithDelim <= amountOfComponentsWithEscapedDelim
        ? 1
        : amountOfComponentsWithDelim - amountOfComponentsWithEscapedDelim;
    return totalAmount;
  }

  /** @methodtype get-method */
  public getComponent(x: number): string {
    let arrayOfComponents = this.name.split(this.delimiter);
    // not sure about /.
    return arrayOfComponents[x];
  }

  /** @methodtype set-method */
  public setComponent(n: number, c: string): void {
    let arrayOfComponents = this.name.split(this.delimiter);
    // not sure about /.
    arrayOfComponents[n] = c;
    this.name = arrayOfComponents.join(this.delimiter);
  }

  /** @methodtype command-method */
  public insert(n: number, c: string): void {
    let arrayOfComponents = this.name.split(this.delimiter);
    // not sure about /.
    arrayOfComponents.splice(n, 0, c);
    this.name = arrayOfComponents.join(this.delimiter);
  }

  /** @methodtype command-method */
  public append(c: string): void {
    this.name += this.delimiter + c;
  }

  /** @methodtype command-method */
  public remove(n: number): void {
    let arrayOfComponents = this.name.split(this.delimiter);
    // not sure about /.
    arrayOfComponents.splice(n, 1);
    this.name = arrayOfComponents.join(this.delimiter);
  }

  /** @methodtype command-method */
  public concat(other: Name): void {
    for (let i = 0; i < other.getNoComponents(); i++) {
      this.append(other.getComponent(i));
    }
  }
}
