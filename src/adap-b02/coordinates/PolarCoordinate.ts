import { Coordinate } from "./Coordinate";

export class PolarCoordinate implements Coordinate {

    private r: number = 0;
    private phi: number = 0;

    constructor(r?: number, phi?: number) {
        this.initialize(r, phi);
    }

    public createOrigin(): Coordinate {
        return new PolarCoordinate(0, 0);
    }  

    public initialize(r?: number, phi?: number): void {
        if (r != undefined) {
            this.setR(r);
        }

        if (phi != undefined) {
            this.setPhi(phi);
        }
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        return this.getX() + "#" + this.getY();
    }

    public isEqual(other: Coordinate): boolean {
        return (this.getX() == other.getX()) && (this.getY() == other.getY());
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
        return new PolarCoordinate(this.doGetR(), this.doGetPhi());
    }

    public reset(): void {
        this.initialize(0, 0);
    }
    
    public getX(): number {
        return this.doGetR() * Math.cos(this.doGetPhi());
    }
    
    public setX(x: number): void {
        let y: number = this.doGetR() * Math.cos(this.doGetPhi());
        this.doSetR(Math.hypot(x, y));
        this.doSetPhi(Math.atan2(y, x));       
    }
    
    public getY(): number {
        return this.doGetR() * Math.sin(this.doGetPhi());
    }

    public setY(y: number): void {
        let x: number = this.doGetR() * Math.sin(this.doGetPhi());
        this.doSetR(Math.hypot(x, y));
        this.doSetPhi(Math.atan2(y, x));       
    }

    public calcStraightLineDistance(other: Coordinate): number {
        let deltaX: number = Math.abs(other.getX() - this.getX());
        let deltaY: number = Math.abs(other.getY() - this.getY());
        return Math.hypot(deltaX, deltaY);
    }
    
    public getR(): number {
        return this.doGetR();
    }

    protected doGetR(): number {
        return this.r;
    }

    public setR(r: number): void {
        this.doSetR(r);
    }

    protected doSetR(r: number): void {
        this.r = r;     
    }

    public getPhi(): number {
        return this.doGetPhi();
    }

    protected doGetPhi(): number {
        return this.phi;
    }

    public setPhi(phi: number): void {
        this.doSetPhi(phi);
    }

    protected doSetPhi(phi: number): void {
        this.phi = phi;   
    }
    
    public calcGreatCircleDistance(other: Coordinate): number {
        let realR = Math.min(this.doGetR(), other.getR());
        let deltaPhi = Math.abs(other.getPhi() - this.doGetPhi());
        return realR * deltaPhi;
    }

}
