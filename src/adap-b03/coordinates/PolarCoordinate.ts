import { Coordinate } from "./Coordinate";
import { AbstractCoordinate } from "./AbstractCoordinate";

export class PolarCoordinate extends AbstractCoordinate {

    private r: number = 0;
    private phi: number = 0;

    constructor(r?: number, phi?: number) {
        super();
        
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

    public reset() {
        this.initialize(0, 0);
    }
    
    protected doGetX(): number {
        return this.doGetR() * Math.cos(this.doGetPhi());
    }
    
    protected doSetX(x: number): void {
        let y: number = this.doGetR() * Math.cos(this.doGetPhi());
        this.doSetR(Math.hypot(x, y));
        this.doSetPhi(Math.atan2(y, x));
    }
    
    protected doGetY(): number {
        return this.doGetR() * Math.sin(this.doGetPhi());
    }

    protected doSetY(y: number): void {
        let x: number = this.doGetR() * Math.sin(this.doGetPhi());
        this.doSetR(Math.hypot(x, y));
        this.doSetPhi(Math.atan2(y, x));       
    }

    protected doGetR(): number {
        return this.r;
    }

    protected doSetR(r: number): void {
        this.r = r;   
    }

    protected doGetPhi(): number {
        return this.phi;
    }
   
    protected doSetPhi(phi: number): void {
        this.phi = phi;   
    }

}
