import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringName implements Name {

  protected delimiter: string = DEFAULT_DELIMITER;

  protected name: string = "";
  protected length: number = 0;

  constructor(other: string, delimiter?: string) {
    this.name = other;

    if (delimiter != undefined) {
      this.delimiter = delimiter;
    }
  }

  private getDelimRegExp(delimiter: string = this.delimiter): RegExp {
    // Escape delimiter if it's a special regex character
    let escapedDelimiter: string = delimiter.replaceAll(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    let escapedEscapeCharacter: string = ESCAPE_CHARACTER.replaceAll(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); // I actually feel stupid doing this

    // RegExp to find all unescaped delimiter chars
    return new RegExp(`(?<!${escapedEscapeCharacter})${escapedDelimiter}`, 'g');
  }

  private getParts(): string[] {
    let reg: RegExp = this.getDelimRegExp();
    return this.name.split(reg);
  }

  public asString(delimiter: string = this.delimiter): string {
    // return this.name.replaceAll(this.getDelimRegExp(), delimiter).replaceAll("\\", "");
    return this.name.replaceAll(ESCAPE_CHARACTER + this.delimiter, this.delimiter) // un-escape delimiters
      .replaceAll(this.delimiter, delimiter); // replace delimiters

  }

  public asDataString(): string {
    if (this.delimiter == DEFAULT_DELIMITER) { // trivial case
      return this.name;
    } else { // the "let's guess how it should behave"-case
      let dataString: string = this.name;

      // escape default delimiters
      dataString = dataString.replaceAll(this.getDelimRegExp(DEFAULT_DELIMITER), ESCAPE_CHARACTER + DEFAULT_DELIMITER);

      // replace inatance-delimters wit default-delimiter
      dataString = dataString.replaceAll(this.getDelimRegExp(), DEFAULT_DELIMITER);
      
      // un-escape escaped instance-delimiters
      dataString = dataString.replaceAll(ESCAPE_CHARACTER + this.delimiter, this.delimiter);

      return dataString
    }
  }

  public isEmpty(): boolean {
    return this.name == "";
  }

  public getDelimiterCharacter(): string {
    return this.delimiter;
  }

  public getNoComponents(): number {
    return this.getParts().length;
  }

  public getComponent(x: number): string {
    let parts = this.getParts();
    if ((x >= 0) && (x < parts.length)) {
      return parts[x];
    } else {
      throw new Error("Index out of bounds")
    }
  }

  public setComponent(n: number, c: string): void {
    let parts = this.getParts();
    if ((n >= 0) && (n < parts.length)) {
      parts[n] = c;
      this.name = parts.join(this.delimiter);
    } else {
      throw new Error("Index out of bounds")
    }
  }

  public insert(n: number, c: string): void {
    let parts = this.getParts();
    if ((n >= 0) && (n <= parts.length)) {
      parts.splice(n, 0, c);
      this.name = parts.join(this.delimiter);
    } else {
      throw new Error("Index out of bounds")
    }
  }

  public append(c: string): void {
    this.name += this.delimiter + c;
  }

  public remove(n: number): void {
    let parts = this.getParts();
    if ((n >= 0) && (n < parts.length)) {
      parts.splice(n, 1);
      this.name = parts.join(this.delimiter);
    } else {
      throw new Error("Index out of bounds")
    }
  }

  public concat(other: Name): void {
    if (other.getDelimiterCharacter() == this.getDelimiterCharacter()) {
      for (let i = 0; i < other.getNoComponents(); i++) {
        this.append(other.getComponent(i));
      }
    } else {
      throw new Error("Cannot concatenate names with different delimiters")
    }
  }

}
