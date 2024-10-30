import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringArrayName implements Name {
  protected components: string[] = [];
  protected delimiter: string = DEFAULT_DELIMITER;

  constructor(other: string[], delimiter?: string) {
    if (other) {
      this.components = other;
    }
    if (delimiter) {
      this.delimiter = delimiter;
    }
  }

  public asString(delimiter: string = this.delimiter): string {
    let string = "";
    for (let i = 0; i < this.components.length; i++) {
      if (i === this.components.length - 1) {
        string = string + this.components[i];
      } else {
        string = string + this.components[i] + delimiter;
      }
    }
    return string;
  }

  public asDataString(): string {
    return this.asString(ESCAPE_CHARACTER + this.delimiter);
  }

  public isEmpty(): boolean {
    return !this.components;
  }

  public getDelimiterCharacter(): string {
    return this.delimiter;
  }

  public getNoComponents(): number {
    return this.components.length;
  }

  public getComponent(i: number): string {
    if(i >= 0 && i < this.getNoComponents()){
        return this.components[i];
    }
    return "";
  }

  public setComponent(i: number, c: string): void {
    if(i >= 0 && i < this.getNoComponents()){
        this.components[i] = c;
    }
  }

  public insert(i: number, c: string): void {
    if (i >= 0 && i <= this.components.length) {
        this.components.splice(i, 0, c);
      }
  }

  public append(c: string): void {
    this.components.push(c);
  }

  public remove(i: number): void {
    if (i >= 0 && i < this.components.length) {
        this.components.splice(i, 1);
      }
  }

  public concat(other: Name): void {
    throw new Error("needs implementation");
  }
}
