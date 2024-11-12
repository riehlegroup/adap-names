export interface Equality {

    /**
     * Returns true if other object is of equal value to this one
     * @param other Object to compare with
     */
    isEqual(other: Object): boolean; // @todo How to ensure this works with vitest and Object.is?

    /**
     * Returns hashcode for this object, respecting equality contract
     */
    getHashCode(): number;
}
