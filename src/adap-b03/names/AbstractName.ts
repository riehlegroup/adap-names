import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export abstract class AbstractName implements Name {
  protected delimiter: string = DEFAULT_DELIMITER;

  /** @methodtype object creation-method */
  constructor(delimiter: string = DEFAULT_DELIMITER) {
    this.delimiter = delimiter;
  }

  /** @methodtype conversion-method */
  public asString(delimiter: string = this.delimiter): string {
    let array = [];
    for (let index = 0; index < this.getNoComponents(); index++) {
      array.push(this.getComponent(index));
    }
    array = array.map((componentString) => {
      return componentString.replaceAll(
        ESCAPE_CHARACTER + this.delimiter,
        this.delimiter
      );
    });
    return array.join(delimiter);
  }

  /** @methodtype conversion-method */
  public toString(): string {
    const className = this.constructor.name;
    const components = this.asDataString();
    return `${className} { components: [${components}], delimiter: '${this.delimiter}' }`;
  }

  /** @methodtype conversion-method */
  public asDataString(): string {
    let array = [];
    for (let index = 0; index < this.getNoComponents(); index++) {
      array.push(this.getComponent(index));
    }
    return array.join(this.delimiter);
  }

  /** @methodtype boolean query-method */
  public isEqual(other: Name): boolean {
    return this.asDataString() === other.asDataString();
  }

  /** @methodtype get-method */
  public getHashCode(): number {
    let hashCode: number = 0;
    const s: string = this.asDataString();
    for (let i = 0; i < s.length; i++) {
      let c = s.charCodeAt(i);
      hashCode = (hashCode << 5) - hashCode + c;
      hashCode |= 0;
    }
    return hashCode;
  }

  /** @methodtype command-method */
  public clone(): Name {
    return this.clone();
  }

  /** @methodtype boolean query-method */
  public isEmpty(): boolean {
    return this.getNoComponents() == 0;
  }

  /** @methodtype get-method */
  public getDelimiterCharacter(): string {
    return this.delimiter;
  }

  /** @methodtype get-method */
  abstract getNoComponents(): number;

  /** @methodtype get-method */
  abstract getComponent(i: number): string;

  /** @methodtype set-method */
  abstract setComponent(i: number, c: string): void;

  /** @methodtype command-method */
  abstract insert(i: number, c: string): void;

  /** @methodtype command-method */
  abstract append(c: string): void;

  /** @methodtype command-method */
  abstract remove(i: number): void;

  /** @methodtype command-method */
  public concat(other: Name): void {
    for (let i = 0; i < other.getNoComponents(); i++) {
      this.append(other.getComponent(i));
    }
  }
}
