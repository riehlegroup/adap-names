import { Coordinate } from "./Coordinate";
import { AbstractCoordinate } from "./AbstractCoordinate";

export class PolarCoordinate extends AbstractCoordinate {

    private r: number = 0;
    private phi: number = 0;

    constructor(r?: number, phi?: number) {
        super();

        this.initialize(r, phi);
    }

    protected initialize(r?: number, phi?: number): void {
        if (r != undefined) {
            this.setR(r);
        }

        if (phi != undefined) {
            this.setPhi(phi);
        }
    }

    public getOrigin(): Coordinate {
        return new PolarCoordinate(0, 0);
    }
    
    protected doGetX(): number {
        return this.doGetR() * Math.cos(this.doGetPhi());
    }
    
    protected doSetX(x: number): Coordinate {
        let y: number = this.doGetR() * Math.cos(this.doGetPhi());
        let newR: number = Math.hypot(x, y);
        let newPhi: number = Math.atan2(y, x);
        return new PolarCoordinate(newR, newPhi);
    }
    
    protected doGetY(): number {
        return this.doGetR() * Math.sin(this.doGetPhi());
    }

    protected doSetY(y: number): Coordinate {
        let x: number = this.doGetR() * Math.sin(this.doGetPhi());
        let newR: number = Math.hypot(x, y);
        let newPhi: number = Math.atan2(y, x);
        return new PolarCoordinate(newR, newPhi);    
    }

    protected doGetR(): number {
        return this.r;
    }

    protected doSetR(r: number): Coordinate {
        return new PolarCoordinate(r, this.phi);
    }

    protected doGetPhi(): number {
        return this.phi;
    }
   
    protected doSetPhi(phi: number): Coordinate {
        return new PolarCoordinate(this.r, phi);   
    }

}
