import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringName implements Name {
  protected delimiter: string = DEFAULT_DELIMITER;

  protected name: string = "";
  protected length: number = 0;

  constructor(other: string, delimiter?: string) {
    this.name = other;
    if (delimiter) {
      this.delimiter = delimiter;
    }
  }

  public asString(delimiter: string = this.delimiter): string {
    let nameWithOldDelim = this.name;
    return nameWithOldDelim.replaceAll(this.delimiter, delimiter);
  }

  public asDataString(): string {
    return this.name.replaceAll(
      this.delimiter,
      ESCAPE_CHARACTER + this.delimiter
    );
  }

  public isEmpty(): boolean {
    return !this.name;
  }

  public getDelimiterCharacter(): string {
    return this.delimiter;
  }

  public getNoComponents(): number {
    let amountOfComponentsWithEscapedDelim = this.name.split(ESCAPE_CHARACTER + this.delimiter).length || 0;
    let amountOfComponentsWithDelim = this.name.split(this.delimiter).length || 0;
    let totalAmount = amountOfComponentsWithDelim <= amountOfComponentsWithEscapedDelim ? 1 : amountOfComponentsWithDelim - amountOfComponentsWithEscapedDelim
    return totalAmount;
  }

  public getComponent(x: number): string {
    let arrayOfComponents = this.name.split(this.delimiter);
    // not sure about /.
    return arrayOfComponents[x];
  }

  public setComponent(n: number, c: string): void {
    let arrayOfComponents = this.name.split(this.delimiter);
    // not sure about /.
    arrayOfComponents[n] = c;
    this.name = arrayOfComponents.join(this.delimiter);
  }

  public insert(n: number, c: string): void {
    let arrayOfComponents = this.name.split(this.delimiter);
    // not sure about /.
    arrayOfComponents.splice(n, 0, c);
    this.name = arrayOfComponents.join(this.delimiter);
  }

  public append(c: string): void {
    this.name += this.delimiter + c;
  }

  public remove(n: number): void {
    let arrayOfComponents = this.name.split(this.delimiter);
    // not sure about /.
    arrayOfComponents.splice(n, 1);
    this.name = arrayOfComponents.join(this.delimiter);
  }

  public concat(other: Name): void {
    throw new Error("needs implementation");
  }
}
