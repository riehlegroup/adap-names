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
export interface Name {

    /**
     * Returns a human-readable representation of the Name instance using user-set control characters
     * Control characters are not escaped (creating a human-readable string)
     * Users can vary the delimiter character to be used
     */
    asString(delimiter?: string): string;

    /** 
     * Returns a machine-readable representation of Name instance using default control characters
     * Machine-readable means that from a data string, a Name can be parsed back in
     * The control characters in the data string are the default characters
     */
    asDataString(): string;

    isEmpty(): boolean;

    getDelimiterCharacter(): string;

    /** Returns number of components in Name instance */
    getNoComponents(): number;

    getComponent(i: number): string;

    /** Assumes that new Name component c is properly masked */
    setComponent(i: number, c: string): void;

    /** Assumes that new Name component c is properly masked */
    insert(i: number, c: string): void;

    /** Assumes that new Name component c is properly masked */
    append(c: string): void;

    remove(i: number): void;
    
}