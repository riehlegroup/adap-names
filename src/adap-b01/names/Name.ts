export const DEFAULT_DELIMITER: string = '.';
export const ESCAPE_CHARACTER = '\\';

/**
 * A name is a sequence of string components separated by a delimiter character.
 * Special characters within the string may need masking, if they are to appear verbatim.
 * There are only two special characters, the delimiter character and the escape character.
 * The escape character can't be set, the delimiter character can.
 * 
 * Homogenous name examples
 * 
 * "oss.cs.fau.de" is a name with four name components and the delimiter character '.'.
 * "///" is a name with four empty components and the delimiter character '/'.
 * "Oh\.\.\." is a name with one component, if the delimiter character is '.'.
 */
export class Name {

  public readonly DEFAULT_DELIMITER: string = '.';
  private readonly ESCAPE_CHARACTER = '\\';

  private components: string[] = [];
  private delimiter: string = this.DEFAULT_DELIMITER;

  /** @methodtype initialization-method */
  constructor(other: string[], delimiter?: string) {
    this.components = other
    if (delimiter != undefined) {
      this.delimiter = delimiter;
    }
  }

  /** @methodtype conversion-method */
  public asNameString(delimiter: string = this.delimiter): string {
    return this.components.map(str =>
      str.replace(new RegExp('\\' + delimiter, 'g'), this.ESCAPE_CHARACTER + delimiter)
    ).join(delimiter);
  }

  /** @methodtype get-method */
  public getComponent(i: number): string {
    if ((i >= 0) && (i < this.getNoComponents())) {
      return this.components[i];
    } else {
      throw new Error("Index out of bounds.");
    }
  }

  /** @methodtype set-method */
  public setComponent(i: number, c: string): void {
    if ((i >= 0) && (i < this.getNoComponents())) {
      this.components[i] = c;
    } else {
      throw new Error("Index out of bounds.");
    }
  }

  /** @methodtype get-method */
  public getNoComponents(): number {
    return this.components.length;
  }

  /** @methodtype command-method */
  public insert(i: number, c: string): void {
    if ((i >= 0) && (i <= this.getNoComponents())) {
      this.components.splice(i, 0, c);
    } else {
      throw new Error("Index out of bounds.");
    }
  }

  /** @methodtype command-method */
  public append(c: string): void {
    this.components.push(c);
  }

  /** @methodtype command-method */
  public remove(i: number): void {
    if ((i >= 0) && (i < this.getNoComponents())) {
      this.components.splice(i, 1);
    } else {
      throw new Error("Index out of bounds.");
    }
  }
}
