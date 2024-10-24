export class Coordinate {

    private x: number = 0;
    private y: number = 0;

    constructor(x?: number, y?: number) {
        this.initialize(x, y);
    }

    public static getOrigin(): Coordinate {
        return new Coordinate(0, 0);
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

    public reset(): void {
        this.initialize(0, 0);
    }

    /** @methodtype get-method */
    public getX(): number {
        return this.x;
    }
    
    public setX(x: number) {
        this.x = x;
    }
    
    public getY(): number {
        return this.y;
    }

    public setY(y: number) {
        this.y = y;
    }

    public calcStraightLineDistance(other: Coordinate): number {
        let deltaX: number = Math.abs(other.getX() - this.getX());
        let deltaY: number = Math.abs(other.getY() - this.getY());
        return Math.hypot(deltaX, deltaY);
    }

 }