// src/adap-b01/names/Name.ts

export const DEFAULT_DELIMITER: string = ".";
export const ESCAPE_CHARACTER = "\\";

/**
 * A name is a sequence of string components separated by a delimiter.
 * Only two characters are special: the delimiter and the escape character.
 * Constructor and mutators expect components to be *masked* for the current delimiter:
 *   inside a component, '\' is written as '\\' and the delimiter as '\{delimiter}'.
 */
export class Name {

  private delimiter: string = DEFAULT_DELIMITER;
  private components: string[] = [];

  /** Expects that all Name components are properly masked */
  constructor(other: string[], delimiter?: string) {
    this.delimiter = this.normalizeDelimiter(delimiter ?? DEFAULT_DELIMITER);
    this.components = Array.isArray(other) ? [...other] : [];
  }

  /**
   * Returns a human-readable representation using the provided delimiter.
   * Unmasks stored components (for this.delimiter), then joins with `delimiter`.
   */
  public asString(delimiter: string = this.delimiter): string {
    const raw = this.components.map(c => this.unmask(c, this.delimiter));
    return raw.join(delimiter);
  }

  /**
   * Returns a machine-readable representation using DEFAULT control characters.
   * Unmasks for this.delimiter, then re-mask for DEFAULT_DELIMITER and join with '.'.
   */
  public asDataString(): string {
    const raw = this.components.map(c => this.unmask(c, this.delimiter));
    const maskedForDefault = raw.map(r => this.mask(r, DEFAULT_DELIMITER));
    return maskedForDefault.join(DEFAULT_DELIMITER);
  }

  public getComponent(i: number): string {
    return this.components[i];
  }

  /** Expects c is already masked for the current delimiter */
  public setComponent(i: number, c: string): void {
    if (i < 0 || i >= this.components.length) return;
    this.components[i] = c;
  }

  /** Returns number of components */
  public getNoComponents(): number {
    return this.components.length;
  }

  /** Expects c is already masked for the current delimiter */
  public insert(i: number, c: string): void {
    const idx = Math.max(0, Math.min(i, this.components.length));
    this.components.splice(idx, 0, c);
  }

  /** Expects c is already masked for the current delimiter */
  public append(c: string): void {
    this.components.push(c);
  }

  public remove(i: number): void {
    if (i < 0 || i >= this.components.length) return;
    this.components.splice(i, 1);
  }

  // ===== helpers =====

  private normalizeDelimiter(d: string): string {
    if (typeof d !== "string" || d.length !== 1) {
      throw new RangeError("delimiter must be a single character");
    }
    if (d === ESCAPE_CHARACTER) {
      throw new RangeError("escape character cannot be the delimiter");
    }
    return d;
  }

  /** Convert raw to masked for a given delimiter */
  private mask(raw: string, delimiter: string): string {
    return raw
      .replace(/\\/g, ESCAPE_CHARACTER + ESCAPE_CHARACTER)
      .replace(new RegExp(this.escapeForRegExp(delimiter), "g"), ESCAPE_CHARACTER + delimiter);
  }

  /** Convert masked (for given delimiter) back to raw */
  private unmask(masked: string, delimiter: string): string {
    let out = "";
    for (let i = 0; i < masked.length; i++) {
      const ch = masked[i];
      if (ch === ESCAPE_CHARACTER) {
        const next = masked[i + 1];
        if (next === ESCAPE_CHARACTER || next === delimiter) {
          out += next;
          i++;
        } else {
          // keep stray backslash literally
          out += ESCAPE_CHARACTER;
        }
      } else {
        out += ch;
      }
    }
    return out;
  }

  private escapeForRegExp(s: string): string {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
}
