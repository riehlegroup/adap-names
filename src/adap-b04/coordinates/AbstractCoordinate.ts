import { ExceptionType } from "../common/AssertionDispatcher";
import { AssertionDispatcher } from "../common/AssertionDispatcher";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { Coordinate } from "./Coordinate";

export abstract class AbstractCoordinate implements Coordinate {

    public abstract clone(): Coordinate;

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        return this.doGetX() + "#" + this.doGetY();
    }

    public isEqual(other: Coordinate): boolean {
        this.assertIsNotNullOrUndefinedAsPrecondition(other);

        return (this.doGetX() == other.getX()) && (this.doGetY() == other.getY());
    }

    public getHashCode(): number {
        let hashCode: number = 0;
        const s: string = this.asDataString();
        for (let i: number = 0; i < s.length; i++) {
            let c: number = s.charCodeAt(i);
            hashCode = (hashCode << 5) - hashCode + c;
            hashCode |= 0;
        }
        return hashCode;
    }

    abstract reset(): void;

    public getX(): number {
        return this.doGetX();
    }

    protected abstract doGetX(): number;

    public setX(x: number): void {
        this.assertIsNotNullOrUndefinedAsPrecondition(x);

        this.doSetX(x);
    }

    protected abstract doSetX(x: number): void;

    public getY(): number {
        return this.doGetY();
    }

    protected abstract doGetY(): number;

    public setY(y: number): void {
        this.assertIsNotNullOrUndefinedAsPrecondition(y);

        this.doSetY(y);
    }

    protected abstract doSetY(y: number): void;

    public calcStraightLineDistance(other: Coordinate): number {
        this.assertIsNotNullOrUndefinedAsPrecondition(other);

        let deltaX: number = Math.abs(other.getX() - this.doGetX());
        let deltaY: number = Math.abs(other.getY() - this.doGetY());
        return Math.hypot(deltaX, deltaY);
    }
    
    public getR(): number {
        return this.doGetR();
    }

    protected abstract doGetR(): number;

    public setR(r: number): void {
        this.assertIsNotNullOrUndefinedAsPrecondition(r);
        this.assertIsValidRAsPrecondition(r);

        this.doSetR(r);
    }

    protected abstract doSetR(r: number): void;

    public getPhi(): number {
        return this.doGetPhi();
    }

    protected abstract doGetPhi(): number;

    /**
     * Example code to demonstrate design by contract
     * @param phi Angle of vector
     */
    public setPhi(phi: number): void {
        this.assertIsNotNullOrUndefinedAsPrecondition(phi);
        this.assertIsValidPhiAsPrecondition(phi);

        this.doSetPhi(phi);

        const newPhi: number = this.doGetPhi();
        this.assertIsValidPhiAsClassInvariant(newPhi);

        MethodFailedException.assertCondition(newPhi == phi);
    }

    protected abstract doSetPhi(phi: number): void;

    public calcGreatCircleDistance(other: Coordinate): number {
        this.assertIsNotNullOrUndefinedAsPrecondition(other);

        let lowerR = Math.min(this.getR(), other.getR());
        let deltaPhi = Math.abs(other.getPhi() - this.getPhi());
        return lowerR * deltaPhi;
    }

    public multiplyWith(other: Coordinate): void {
        this.assertIsNotNullOrUndefinedAsPrecondition(other);

        let newR = this.getR() * other.getR();
        let newPhi = this.getPhi() + other.getPhi();
        this.setR(newR);
        this.setPhi(newPhi);
    }

    protected assertIsNotNullOrUndefinedAsPrecondition(other: Object): void {
        this.assertIsNotNullOrUndefined(other, ExceptionType.PRECONDITION);
    }

    protected assertIsNotNullOrUndefined(other: Object, et: ExceptionType): void {
        let condition: boolean = !IllegalArgumentException.isNullOrUndefined(other);
        AssertionDispatcher.dispatch(et, condition, "null or undefined value");        
    }

    protected assertIsValidRAsPrecondition(r: number): void {
        this.assertIsValidR(r, ExceptionType.PRECONDITION);
    }

    protected assertIsValidR(r: number, et: ExceptionType): void {
        let condition: boolean = (r >= 0);
        AssertionDispatcher.dispatch(et, condition, "invalid r value");
    }

    protected assertIsValidPhiAsPrecondition(phi: number): void {
        this.assertIsValidPhi(phi, ExceptionType.PRECONDITION);
    }

    protected assertIsValidPhiAsClassInvariant(phi: number): void {
        this.assertIsValidPhi(phi, ExceptionType.CLASS_INVARIANT);
    }

    protected assertIsValidPhi(phi: number, et: ExceptionType): void {
        let condition: boolean = (phi < 0) || (phi >= 2*Math.PI);
        AssertionDispatcher.dispatch(et, condition, "invalid phi value");
    }

    protected assertIsValidDelCharAsPrecondition(d: string): void {
        this.assertIsValidDelChar(d, ExceptionType.PRECONDITION);
    }

    protected assertIsValidDelChar(d: string, et: ExceptionType): void {
        let condition: boolean = (d.length == 1);
        AssertionDispatcher.dispatch(et, condition, "invalid delimiter character");
    }

}