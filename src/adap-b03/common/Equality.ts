export interface Equality {

    /**
     * Returns true if other object is of equal value to this one
     * @param other Object to compare with
     */
    isEqual(other: Object): boolean;

    /**
     * Returns hashcode for this object, respecting equality contract
     */
    getHashCode(): number;
    
}
