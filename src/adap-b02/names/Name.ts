export const DEFAULT_DELIMITER: string = '.';
export const ESCAPE_CHARACTER = '\\';

export interface Name {

    /** Returns human-readable representation of Name instance */
    asNameString(delimiter?: string): string;

    isEmpty(): boolean;

    getNoComponents(): number;

    getComponent(i: number): string;
    setComponent(i: number, c: string): void;

    insert(i: number, c: string): void;
    append(c: string): void;
    remove(i: number): void;
    
}