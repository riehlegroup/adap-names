import { Coordinate } from "./Coordinate";
import { AbstractCoordinate } from "./AbstractCoordinate";

export class CartesianCoordinate extends AbstractCoordinate {

    private x: number = 0;
    private y: number = 0;

    constructor(x?: number, y?: number) {
        super();

        this.initialize(x, y);
    }

    public createOrigin(): Coordinate {
        return new CartesianCoordinate(0, 0);
    }  

    public initialize(x?: number, y?: number): void {
        if (x != undefined) {
            this.doSetX(x);
        }

        if (y != undefined) {
            this.doSetY(y);
        }
    }

    public reset(): void {
        this.initialize(0, 0);
    }
    
    protected doGetX(): number {
        return this.x;
    }
      
    protected doSetX(x: number): void {
        this.x = x;
    }
    
    protected doGetY(): number {
        return this.y;
    }
    
    protected doSetY(y: number): void {
        this.y = y;
    }

    protected doGetR(): number {
        return Math.hypot(this.doGetX(), this.doGetY());
    }

    protected doSetR(r: number): void {
        let phi: number = Math.atan2(this.doGetY(), this.doGetX());
        this.doSetX(r * Math.cos(phi));
        this.doSetY(r * Math.sin(phi));       
    }

    protected doGetPhi(): number {
        return Math.atan2(this.doGetY(), this.doGetX());
    }

    protected doSetPhi(phi: number): void {
        let r: number = Math.hypot(this.doGetX(), this.doGetY());
        let x: number = r * Math.cos(phi);
        let y: number = r * Math.sin(phi);

        this.doSetX(x);
        this.doSetY(y);       
    }
    
}
