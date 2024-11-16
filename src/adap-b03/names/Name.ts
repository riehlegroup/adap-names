import { Equality } from "../common/Equality";
import { Cloneable } from "../common/Cloneable";
import { Printable } from "../common/Printable";

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
export interface Name extends Printable, Cloneable, Equality {

    /**
     * Returns true, if number of components == 0; else false
     * @methodtype boolean-query-method
     */
    isEmpty(): boolean;

    /** 
     * Returns delimiter character used by Name instances
     * @methodtype get-method
     */
    getDelimiterCharacter(): string;

    /** 
     * Returns number of components in Name instance
     * @methodtype get-method
     */
    getNoComponents(): number;

     /**
     * @methodtype get-method
     */
    getComponent(i: number): string;

    /** Expects that new Name component c is properly masked 
     * @methodtype set-method
    */
    setComponent(i: number, c: string): void;

    /** Expects that new Name component c is properly masked 
     * @methodtype command-method
    */
    insert(i: number, c: string): void;

    /** Expects that new Name component c is properly masked 
     * @methodtype command-method
    */
    append(c: string): void;

    /** 
     * @methodtype command-method
     */
    remove(i: number): void;
    
    /** 
     * @methodtype command-method
     */
    concat(other: Name): void;
    
}