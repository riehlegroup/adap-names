import { MethodFailureException } from "../common/MethodFailureException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.assertIsValidDelimiter(delimiter);

        this.delimiter = delimiter;

        this.assertDelimiterIsSet(delimiter);
    }

    public clone(): Name {
        let clone: Name = { ...this };

        this.assertCloneIsEqual(clone);
        this.assertClassInvariants();

        return clone;
    }

    public asString(delimiter: string = this.delimiter): string {
        // pre-conditions
        this.assertIsValidDelimiter(delimiter);

        let str: string = "";
        let len: number = this.getNoComponents();
        for (let i = 0; i < len; i++) {
            let comp: string = this.getComponent(i);
            comp = comp.replaceAll(ESCAPE_CHARACTER, "");
            str += comp;
            if (i < len - 1) {
                str += delimiter;
            }
        }

        // post-conditions
        this.assertIsValidString(str);
        this.assertClassInvariants();

        return str;
    }

    public toString(): string {
        // pre-conditions
        this.assertIsValidDelimiter(this.delimiter);

        let str: string = "";
        let len: number = this.getNoComponents();
        for (let i = 0; i < len; i++) {
            str += this.getComponent(i);
            if (i < len - 1) {
                str += this.delimiter;
            }
        }
        // post-conditions
        this.assertIsValidString(str);
        this.assertClassInvariants();

        return str;
    }

    public asDataString(): string {
        // pre-conditions
        this.assertIsValidDelimiter(DEFAULT_DELIMITER);

        let str: string = "";
        let len: number = this.getNoComponents();
        for (let i = 0; i < len; i++) {
            let comp: string = this.getComponent(i);
            if (this.delimiter != DEFAULT_DELIMITER) {
                comp = comp.replaceAll(DEFAULT_DELIMITER, ESCAPE_CHARACTER + DEFAULT_DELIMITER);
                comp = comp.replaceAll(ESCAPE_CHARACTER + this.delimiter, this.delimiter);
            }
            str += comp;
            if (i < len - 1) {
                str += DEFAULT_DELIMITER;
            }
        }

        // post-conditions
        this.assertIsValidString(str);
        this.assertClassInvariants();

        return str;
    }

    public isEqual(other: Name): boolean {
        // pre-conditions
        this.assertIsValidName(other);

        return ((this.toString() == other.toString()) &&
            (this.getDelimiterCharacter() == other.getDelimiterCharacter()) &&
            (this.getNoComponents() == other.getNoComponents())
        );
    }

    public getHashCode(): number {
        let hashCode: number = 0;
        const s: string = this.toString() + this.getDelimiterCharacter() + String(this.getNoComponents());
        for (let i = 0; i < s.length; i++) {
            let c = s.charCodeAt(i);
            hashCode = (hashCode << 5) - hashCode + c;
            hashCode |= 0;
        }
        return hashCode;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() == 0;
    }

    public getDelimiterCharacter(): string {
        // pre-conditions
        this.assertIsValidDelimiter(this.delimiter);

        return this.delimiter;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
        this.assertIsValidName(other);
        let oldCompoCount: number = this.getNoComponents();

        if (other.getDelimiterCharacter() != this.getDelimiterCharacter()) {
            throw new Error("Cannot concatenate names with different delimiters")
        }
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }

        this.assertConcatenated(oldCompoCount, other);
        this.assertClassInvariants();
    }


    // pre-conditions

    protected assertIndexInBounds(i: number): void {
        let inBounds: boolean = ((i >= 0) && (i < this.getNoComponents()));
        IllegalArgumentException.assertCondition(inBounds, "Index out of bounds")
    }
    
    protected assertIndexInBoundsForInsert(i: number): void {
        let inBounds: boolean = ((i >= 0) && (i <= this.getNoComponents()));
        IllegalArgumentException.assertCondition(inBounds, "Index out of bounds")
    }

    protected assertIsValidDelimiter(c: string): void {
        IllegalArgumentException.assertIsNotNullOrUndefined(c)
        let isValid: boolean = (c.length === 1) && (c != ESCAPE_CHARACTER);
        IllegalArgumentException.assertCondition(isValid, "Invalid Delimiter")
    }

    protected isValidComponent(c: string): boolean {
        let hasNoUnescapedDelimiters: boolean =
            c.split(this.delimiter).length === c.split(ESCAPE_CHARACTER + this.delimiter).length;
        return hasNoUnescapedDelimiters;
    }

    protected assertIsValidComponent(c: string): void {
        IllegalArgumentException.assertIsNotNullOrUndefined(c);
        let hasNoUnescapedDelimiters: boolean = this.isValidComponent(c);
        IllegalArgumentException.assertCondition(
            hasNoUnescapedDelimiters,
            "Component can not contain unescaped delimiters");
    }

    protected assertIsValidName(n: Name): void {
        IllegalArgumentException.assertIsNotNullOrUndefined(n);
        this.assertIsValidDelimiter(n.getDelimiterCharacter());
    }


    // Class-Invariants

    protected assertClassInvariants(): void {
        this.assertIsValidDelimiter(this.delimiter);
        let validDelimiter: boolean = (this.delimiter.length == 1) && (this.delimiter != ESCAPE_CHARACTER);
        InvalidStateException.assertCondition(validDelimiter, "Invalid Delimiter")
        InvalidStateException.assertCondition(
            (this.getNoComponents() >= 0),
            "Component-count should can not be negative"
        );

        for (let i: number = 0; i < this.getNoComponents(); i++) {
            InvalidStateException.assertCondition(
                this.isValidComponent(this.getComponent(i)),
                "A component is in an invalid state"
            );
        }
    }

    // post-conditions

    protected assertDelimiterIsSet(d: string): void {
        MethodFailureException.assertCondition((d === this.delimiter), "Delimiter not set correctly")
    }

    protected assertCloneIsEqual(clone: Name): void {
        MethodFailureException.assertIsNotNullOrUndefined(clone);
        MethodFailureException.assertCondition((this.isEqual(clone)), "Cloning failed");
    }

    protected assertIsValidString(s: string): void {
        MethodFailureException.assertIsNotNullOrUndefined(s);
        if (!this.isEmpty()) {
            MethodFailureException.assertCondition((s !== ""), "String should not be empty")
        } else {
            MethodFailureException.assertCondition((s === ""), "String should be empty");
        }
    }

    protected assertComponentEquals(i: number, c: string): void {
        MethodFailureException.assertCondition(
            (this.getComponent(i) === c),
            "Setting Component failed"
        )

    }

    protected assertNoComponentsChanged(oldLen: number, expectedDiff: number): void {
        MethodFailureException.assertCondition(
            (this.getNoComponents() === oldLen + expectedDiff),
            "component-count did not change accordingly"
        )
    }

    protected assertComponentInserted(i: number, c: string, oldLen: number): void {
        this.assertComponentEquals(i, c);
        this.assertNoComponentsChanged(oldLen, 1);
    }

    protected assertComponentAppended(c: string, oldLen: number): void {
        this.assertNoComponentsChanged(oldLen, 1);
        this.assertComponentEquals(this.getNoComponents() - 1, c);
    }

    protected assertComponentRemoved(oldLen: number): void {
        this.assertNoComponentsChanged(oldLen, -1);
    }

    protected assertConcatenated(oldLen: number, other: Name): void {
        this.assertNoComponentsChanged(oldLen, other.getNoComponents());
    }

    protected assertReturnNotNullOrUndefined(returnVal: Object | null, exMsg: string = "null or undefined"): void {
        MethodFailureException.assertIsNotNullOrUndefined(returnVal, exMsg);
    }

}

