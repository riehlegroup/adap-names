export interface Equality {
    isEqual(other: Object): boolean;
    getHashCode(): number;
}
