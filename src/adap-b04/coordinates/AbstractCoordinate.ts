import { IllegalArgumentException } from "../common/IllegalArgumentException";
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
        this.assertIsNotNullOrUndefined(other);

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
        this.assertIsNotNullOrUndefined(x);

        this.doSetX(x);
    }

    protected abstract doSetX(x: number): void;

    public getY(): number {
        return this.doGetY();
    }

    protected abstract doGetY(): number;

    public setY(y: number): void {
        this.assertIsNotNullOrUndefined(y);

        this.doSetY(y);
    }

    protected abstract doSetY(y: number): void;

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

    public setR(r: number): void {
        this.assertIsNotNullOrUndefined(r);

        this.doSetR(r);
    }

    protected abstract doSetR(r: number): void;

    public getPhi(): number {
        return this.doGetPhi();
    }

    protected abstract doGetPhi(): number;

    public setPhi(phi: number): void {
        this.assertIsNotNullOrUndefined(phi);
        this.assertIsValidPhi(phi);

        this.doSetPhi(phi);
    }

    protected abstract doSetPhi(phi: number): void;

    public calcGreatCircleDistance(other: Coordinate): number {
        this.assertIsNotNullOrUndefined(other);

        let lowerR = Math.min(this.getR(), other.getR());
        let deltaPhi = Math.abs(other.getPhi() - this.getPhi());
        return lowerR * deltaPhi;
    }

    public multiplyWith(other: Coordinate): void {
        this.assertIsNotNullOrUndefined(other);

        let newR = this.getR() * other.getR();
        let newPhi = this.getPhi() + other.getPhi();
        this.setR(newR);
        this.setPhi(newPhi);
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