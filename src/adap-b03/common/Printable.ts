export const DEFAULT_DELIMITER: string = '.';
export const ESCAPE_CHARACTER = '\\';

export interface Printable {

   /**
     * Returns a human-readable representation of the Name instance using user-set special characters
     * Special characters are not escaped (creating a human-readable string)
     * Users can vary the delimiter character to be used
     * The delimiter character must be a single character
     */
   asString(delimiter?: string): string;

   /** 
    * Returns a machine-readable representation of Name instance using default special characters
    * Machine-readable means that from a data string, a Name can be parsed back in
    * The special characters in the data string are the default characters
    * Different fields of the object are separated by the delimiter character
    */
   asDataString(): string;

   /**
    * Returns delimiter char; must be a single character
    */
   getDelimiterCharacter(): string;

}