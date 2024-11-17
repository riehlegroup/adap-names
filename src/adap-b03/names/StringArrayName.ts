import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {
  protected components: string[] = [];

  /** @methodtype object creation-method */
  constructor(other: string[], delimiter?: string) {
    if (delimiter) {
      super(delimiter);
    } else {
      super();
    }
    if (other) {
      this.components = other;
    }
  }

  /** @methodtype get-method */
  getNoComponents(): number {
    return this.components.length;
  }

  /** @methodtype get-method */
  getComponent(i: number): string {
    if (i >= 0 && i < this.getNoComponents()) {
      return this.components[i];
    }
    return "";
  }

  /** @methodtype set-method */
  setComponent(i: number, c: string) {
    if (i >= 0 && i < this.getNoComponents()) {
      this.components[i] = c;
    }
  }

  /** @methodtype command-method */

  insert(i: number, c: string) {
    if (i >= 0 && i <= this.components.length) {
      this.components.splice(i, 0, c);
    }
  }

  /** @methodtype command-method */
  append(c: string) {
    this.components.push(c);
  }

  /** @methodtype command-method */
  remove(i: number) {
    if (i >= 0 && i < this.components.length) {
      this.components.splice(i, 1);
    }
  }

  cloneSubclass(): Name {
      return Object.assign(new StringArrayName([""]), this);
  }
}
