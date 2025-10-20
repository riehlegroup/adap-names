export class Coordinate {

    private x: number = 0;
    private y: number = 0;

    constructor(x?: number, y?: number) {
        this.initialize(x, y);
    }

    /** @methodtype factory-method */
    public static createOrigin(): Coordinate {
        return new Coordinate(0, 0);
    }

    /** @methodtype initialization-method */
    public initialize(x?: number, y?: number): void {
        if (x != undefined) {
            this.setX(x);
        }

        if (y != undefined) {
            this.setY(y);
        }
    }

    /** @methodtype conversion-method */
    public toString(): string {
        return this.asDataString();
    }

    /** @methodtype conversion-method */
    public asDataString(): string {
        return this.getX() + "#" + this.getY();
    }

    /** @methodtype boolean-query-method */
    public isEqual(other: Coordinate): boolean {
        return (this.getX() == other.getX()) && (this.getY() == other.getY());
    }

    /** @methodtype get-method */
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

    /** @methodtype comparison-method */
    public compareDistance(other: Coordinate): number {
        let thisR = Math.hypot(this.getX(), this.getY());
        let otherR = Math.hypot(this.getX(), this.getY());
        if (thisR == otherR) {
            return 0;
        } else if (thisR < otherR) {
            return -1;
        } else {
            return 1;
        }
    }

    /** @methodtype convenience-method */
    public reset(): void {
        this.initialize(0, 0);
    }

    /** @methodtype get-method */
    public getX(): number {
        return this.x;
    }
    
    /** @methodtype set-method */
    public setX(x: number) {
        this.x = x;
    }

    /** @methodtype get-method */
    public getY(): number {
        return this.y;
    }

    /** @methodtype set-method */
    public setY(y: number) {
        this.y = y;
    }

    /** @methodtype regular-method */
    public calcStraightLineDistance(other: Coordinate): number {
        let deltaX: number = Math.abs(other.getX() - this.getX());
        let deltaY: number = Math.abs(other.getY() - this.getY());
        return Math.hypot(deltaX, deltaY);
    }

 }