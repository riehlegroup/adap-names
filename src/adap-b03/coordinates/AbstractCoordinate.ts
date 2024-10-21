import { Coordinate } from "./Coordinate";

export abstract class AbstractCoordinate implements Coordinate {

    public asDataString(): string {
        return this.doGetX() + "#" + this.doGetY();
    }

    public isEqual(other: Coordinate): boolean {
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

    abstract reset(): void;

    public getX(): number {
        return this.doGetX();
    }

    public setX(x: number): void {
        this.assertIsNotNullOrUndefined(x);
        this.doSetX(x);
    }

    public getY(): number {
        return this.doGetY();
    }

    public setY(y: number): void {
        this.assertIsNotNullOrUndefined(y);
        this.doSetY(y);
    }

    public calcStraightLineDistance(other: Coordinate): number {
        let deltaX: number = Math.abs(other.getX() - this.doGetX());
        let deltaY: number = Math.abs(other.getY() - this.doGetY());
        return Math.hypot(deltaX, deltaY);
    }
    
    public getR(): number {
        return this.doGetR();
    }

    public setR(r: number): void {
        this.assertIsNotNullOrUndefined(r);
        this.doSetR(r);
    }

    public getPhi(): number {
        return this.doGetPhi();
    }

    public setPhi(phi: number): void {
        this.assertIsNotNullOrUndefined(phi);
        this.assertIsValidPhi(phi);
        this.doSetPhi(phi);
    }

    public calcGreatCircleDistance(other: Coordinate): number {
        let realR = Math.min(this.getR(), other.getR());
        let deltaPhi = Math.abs(other.getPhi() - this.getPhi());
        return realR * deltaPhi;
    }

    public multiplyWith(other: Coordinate): void {
        this.assertIsNotNullOrUndefined(other);
        let newR = this.getR() * other.getR();
        let newPhi = this.getPhi() + other.getPhi();
        this.setR(newR);
        this.setPhi(newPhi);
    }

    protected abstract doGetX(): number;
    protected abstract doSetX(x: number): void;
    protected abstract doGetY(): number;
    protected abstract doSetY(y: number): void;
    protected abstract doGetR(): number;
    protected abstract doSetR(r: number): void;
    protected abstract doGetPhi(): number;
    protected abstract doSetPhi(phi: number): void;

    protected assertIsNotNullOrUndefined(other: Object): void {
        if ((other == null) || (other == undefined)) {
            throw new RangeError("Value is null or undefined");
        }
    }

    protected assertIsValidPhi(phi: number): void {
        if ((phi < 0) || (phi >= 2*Math.PI)) {
            throw new RangeError("Invalid phi value");
        }
    }

}