import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
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
        this.doSetX(x);
    }

    protected abstract doSetX(x: number): void;

    public getY(): number {
        return this.doGetY();
    }

    protected abstract doGetY(): number;

    public setY(y: number): void {
        this.doSetY(y);
    }

    protected abstract doSetY(y: number): void;

    public calcStraightLineDistance(other: Coordinate): number {
        let deltaX: number = Math.abs(other.getX() - this.doGetX());
        let deltaY: number = Math.abs(other.getY() - this.doGetY());
        return Math.hypot(deltaX, deltaY);
    }
    
    public getR(): number {
        return this.doGetR();
    }

    protected abstract doGetR(): number;

    public setR(r: number): void {
        IllegalArgumentException.assert(this.isValidR(r));
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
        IllegalArgumentException.assert(this.isValidPhi(phi));

        this.doSetPhi(phi);

        const newPhi: number = this.doGetPhi();
        InvalidStateException.assert(this.isValidPhi(newPhi));

        MethodFailedException.assert(newPhi == phi);
    }

    protected abstract doSetPhi(phi: number): void;

    public calcGreatCircleDistance(other: Coordinate): number {
        let lowerR = Math.min(this.getR(), other.getR());
        let deltaPhi = Math.abs(other.getPhi() - this.getPhi());
        return lowerR * deltaPhi;
    }

    public multiplyWith(other: Coordinate): void {
        let newR = this.getR() * other.getR();
        let newPhi = this.getPhi() + other.getPhi();
        this.setR(newR);
        this.setPhi(newPhi);
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