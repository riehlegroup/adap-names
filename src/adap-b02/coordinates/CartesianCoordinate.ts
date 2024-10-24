import { Coordinate } from "./Coordinate";

export class CartesianCoordinate implements Coordinate {

    private x: number = 0;
    private y: number = 0;

    constructor(x?: number, y?: number) {
        this.initialize(x, y);
    }

    public createOrigin(): Coordinate {
        return new CartesianCoordinate(0, 0);
    }  

    public initialize(x?: number, y?: number): void {
        if (x != undefined) {
            this.setX(x);
        }

        if (y != undefined) {
            this.setY(y);
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
        return new CartesianCoordinate(this.getX(), this.getY());
    }

    public reset(): void {
        this.initialize(0, 0);
    }
    
    public getX(): number {
        return this.doGetX();
    }

    protected doGetX(): number {
        return this.x;
    }
    
    public setX(x: number): void {
        this.doSetX(x);
    }

    protected doSetX(x: number): void {
        this.x = x;
    }
    
    public getY(): number {
        return this.doGetY();
    }

    protected doGetY(): number {
        return this.y;
    }

    public setY(y: number): void {
        this.doSetY(y);
    }

    protected doSetY(y: number): void {
        this.y = y;
    }

    public calcStraightLineDistance(other: Coordinate): number {
        let deltaX: number = Math.abs(other.getX() - this.doGetX());
        let deltaY: number = Math.abs(other.getY() - this.doGetY());
        return Math.hypot(deltaX, deltaY);
    }

    public getR(): number {
        return Math.hypot(this.doGetX(), this.doGetY());
    }

    public setR(r: number): void {
        let phi: number = Math.atan2(this.doGetY(), this.doGetX());
        this.doSetX(r * Math.cos(phi));
        this.doSetY(r * Math.sin(phi));       
    }

    public getPhi(): number {
        return Math.atan2(this.doGetY(), this.doGetX());
    }

    public setPhi(phi: number): void {
        let r: number = Math.hypot(this.doGetX(), this.doGetY());
        this.doSetX(r * Math.cos(phi));
        this.doSetY(r * Math.sin(phi));       
    }
    
    public calcGreatCircleDistance(other: Coordinate): number {
        let realR = Math.min(this.getR(), other.getR());
        let deltaPhi = Math.abs(other.getPhi() - this.getPhi());
        return realR * deltaPhi;
    }

}
