import { Coordinate } from "./Coordinate";
import { AbstractCoordinate } from "./AbstractCoordinate";

export class CartesianCoordinate extends AbstractCoordinate {

    private x: number = 0;
    private y: number = 0;

    constructor(x?: number, y?: number) {
        super();

        this.initialize(x, y);
    }

    protected initialize(x?: number, y?: number): void {
        if (x != undefined) {
            this.doSetX(x);
        }

        if (y != undefined) {
            this.doSetY(y);
        }
    }

    public getOrigin(): Coordinate {
        return new CartesianCoordinate(0, 0);
    }
   
    protected doGetX(): number {
        return this.x;
    }
    
    protected doSetX(x: number): Coordinate {
        return new CartesianCoordinate(x, this.y);
    }
    
    public doGetY(): number {
        return this.y;
    }

    protected doSetY(y: number): Coordinate {
        return new CartesianCoordinate(this.x, y);
    }

    protected doGetR(): number {
        return Math.hypot(this.doGetX(), this.doGetY());
    }

    protected doSetR(r: number): Coordinate {
        let phi: number = Math.atan2(this.doGetY(), this.doGetX());
        let newX: number = r * Math.cos(phi);
        let newY: number = r * Math.sin(phi);
        return new CartesianCoordinate(newX, newY);
    }

    protected doGetPhi(): number {
        return Math.atan2(this.doGetY(), this.doGetX());
    }

    protected doSetPhi(phi: number): Coordinate {
        let r: number = Math.hypot(this.doGetX(), this.doGetY());
        let newX: number = r * Math.cos(phi);
        let newY: number = r * Math.sin(phi);
        return new CartesianCoordinate(newX, newY);
    }
  
}
