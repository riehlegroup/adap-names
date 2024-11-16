import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { Coordinate } from "./Coordinate";
import { PolarCoordinate } from "./PolarCoordinate";

export abstract class AbstractCoordinate implements Coordinate {

    public asString(delChar: string) {
        this.assertIsValidDelChar(delChar);

        return this.doGetX() + delChar + this.doGetY();
    }

    public toString() {
        return this.asDataString();
    }

    public asDataString(): string {
        return this.asString("#");
    }

    public isEqual(other: Coordinate): boolean {
        this.assertIsNotNullOrUndefined(other);

        return (this.doGetX() == other.getX()) && (this.doGetY() == other.getY());
    }

    public getHashCode(): number {
        let hashCode: number = 0;
        const s: string = this.asDataString();
        for (let i = 0; i < s.length; i++) {
            let c = s.charCodeAt(i);
            hashCode = (hashCode << 5) - hashCode + c;
            hashCode |= 0;
        }
        return hashCode;
    }

    public clone(): Coordinate {
        return { ...this };
    }

    abstract getOrigin(): Coordinate;

    public getX(): number {
        return this.doGetX();
    }

    protected abstract doGetX(): number;

    public setX(x: number): Coordinate {
        this.assertIsNotNullOrUndefined(x);

        return this.doSetX(x);
    }

    protected abstract doSetX(x: number): Coordinate;

    public getY(): number {
        return this.doGetY();
    }

    protected abstract doGetY(): number;

    public setY(y: number): Coordinate {
        this.assertIsNotNullOrUndefined(y);

        return this.doSetY(y);
    }

    protected abstract doSetY(y: number): Coordinate;

    public calcStraightLineDistance(other: Coordinate): number {
        this.assertIsNotNullOrUndefined(other);

        let deltaX: number = Math.abs(other.getX() - this.doGetX());
        let deltaY: number = Math.abs(other.getY() - this.doGetY());
        return Math.hypot(deltaX, deltaY);
    }
    
    public getR(): number {
        return this.doGetR();
    }

    protected abstract doGetR(): number;

    public setR(r: number): Coordinate {
        this.assertIsNotNullOrUndefined(r);

        return this.doSetR(r);
    }

    protected abstract doSetR(r: number): Coordinate;

    public getPhi(): number {
        return this.doGetPhi();
    }

    protected abstract doGetPhi(): number;

    public setPhi(phi: number): Coordinate {
        this.assertIsNotNullOrUndefined(phi);
        this.assertIsValidPhi(phi);

        return this.doSetPhi(phi);
    }

    protected abstract doSetPhi(phi: number): Coordinate;

    public calcGreatCircleDistance(other: Coordinate): number {
        this.assertIsNotNullOrUndefined(other);

        let lowerR = Math.min(this.getR(), other.getR());
        let deltaPhi = Math.abs(other.getPhi() - this.getPhi());
        return lowerR * deltaPhi;
    }

    public multiplyWith(other: Coordinate): Coordinate {
        this.assertIsNotNullOrUndefined(other);

        let newR = this.getR() * other.getR();
        let newPhi = this.getPhi() + other.getPhi();
        return new PolarCoordinate(newR, newPhi);
    }

    protected assertIsNotNullOrUndefined(other: Object): void {
        let condition: boolean = !IllegalArgumentException.isNullOrUndefined(other);
        IllegalArgumentException.assertCondition(condition, "null or undefined argument");        
    }

    protected assertIsValidPhi(phi: number): void {
        let condition: boolean = (phi < 0) || (phi >= 2*Math.PI);
        IllegalArgumentException.assertCondition(condition, "invalid phi value");
    }

    protected assertIsValidDelChar(d: string) {
        let condition: boolean = (d.length == 1);
        IllegalArgumentException.assertCondition(condition, "invalid delimiter character");
    }

}