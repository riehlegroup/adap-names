import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringArrayName implements Name {
  protected components: string[] = [];
  protected delimiter: string = DEFAULT_DELIMITER;

  /** @methodtype object creation-method */
  constructor(other: string[], delimiter?: string) {
    if (other) {
      this.components = other;
    }
    if (delimiter) {
      this.delimiter = delimiter;
    }
  }

  /** @methodtype conversion-method */
  public asString(delimiter: string = this.delimiter): string {
    return this.components.join(delimiter);
  }

  /** @methodtype conversion-method */
  public asDataString(): string {
    return this.asString(ESCAPE_CHARACTER + this.delimiter);
  }

  /** @methodtype boolean query-method */
  public isEmpty(): boolean {
    return !this.components;
  }

  /** @methodtype get-method */
  public getDelimiterCharacter(): string {
    return this.delimiter;
  }

  /** @methodtype get-method */
  public getNoComponents(): number {
    return this.components.length;
  }

  /** @methodtype get-method */
  public getComponent(i: number): string {
    if (i >= 0 && i < this.getNoComponents()) {
      return this.components[i];
    }
    return "";
  }

  /** @methodtype set-method */
  public setComponent(i: number, c: string): void {
    if (i >= 0 && i < this.getNoComponents()) {
      this.components[i] = c;
    }
  }

  /** @methodtype command-method */
  public insert(i: number, c: string): void {
    if (i >= 0 && i <= this.components.length) {
      this.components.splice(i, 0, c);
    }
  }

  /** @methodtype command-method */
  public append(c: string): void {
    this.components.push(c);
  }

  /** @methodtype command-method */
  public remove(i: number): void {
    if (i >= 0 && i < this.components.length) {
      this.components.splice(i, 1);
    }
  }

  /** @methodtype command-method */
  public concat(other: Name): void {
    for (let i = 0; i < other.getNoComponents(); i++) {
      this.append(other.getComponent(i));
    }
  }
}
