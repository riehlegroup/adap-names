import { IllegalArgumentException } from "../common/IllegalArgumentException";

import { Coordinate } from "./Coordinate";

export abstract class AbstractCoordinate implements Coordinate {

    public clone(): Coordinate {
        return this.doCreate(this.doGetX(), this.doGetY());
    }

    protected abstract doCreate(x: number, y: number): Coordinate;

    public asString(delChar: string) {
        IllegalArgumentException.assert(this.isValidDelChar(delChar));
        return this.doGetX() + delChar + this.doGetY();
    }

    public toString() {
        return this.asDataString();
    }

    public abstract asDataString(): string;

    public isEqual(other: Coordinate): boolean {
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

    abstract getOrigin(): Coordinate;

    public getX(): number {
        return this.doGetX();
    }

    protected abstract doGetX(): number;

    public setX(x: number): Coordinate {
        return this.doSetX(x);
    }

    protected abstract doSetX(x: number): Coordinate;

    public getY(): number {
        return this.doGetY();
    }

    protected abstract doGetY(): number;

    public setY(y: number): Coordinate {
        return this.doSetY(y);
    }

    protected abstract doSetY(y: number): Coordinate;

    public calcStraightLineDistance(other: Coordinate): number {
        let deltaX: number = Math.abs(other.getX() - this.doGetX());
        let deltaY: number = Math.abs(other.getY() - this.doGetY());
        return Math.hypot(deltaX, deltaY);
    }
    
    public getR(): number {
        return this.doGetR();
    }

    protected abstract doGetR(): number;

    public setR(r: number): Coordinate {
        return this.doSetR(r);
    }

    protected abstract doSetR(r: number): Coordinate;

    public getPhi(): number {
        return this.doGetPhi();
    }

    protected abstract doGetPhi(): number;

    public setPhi(phi: number): Coordinate {
        IllegalArgumentException.assert(this.isValidPhi(phi));
        return this.doSetPhi(phi);
    }

    protected abstract doSetPhi(phi: number): Coordinate;

    public calcGreatCircleDistance(other: Coordinate): number {
        let lowerR = Math.min(this.getR(), other.getR());
        let deltaPhi = Math.abs(other.getPhi() - this.getPhi());
        return lowerR * deltaPhi;
    }

    public multiplyWith(other: Coordinate): Coordinate {
        let newR = this.getR() * other.getR();
        let newPhi = this.getPhi() + other.getPhi();
        return this.doCreate(newR, newPhi);
    }

    protected isValidR(r: number): boolean {
        return r >= 0;
    }

    protected isValidPhi(phi: number): boolean {
        return (phi >= 0) && (phi < 2*Math.PI);
    }

    protected isValidDelChar(d: string): boolean {
        return d.length == 1;
    }

}