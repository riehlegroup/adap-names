import { Equality } from "../common/Equality";
import { Cloneable } from "../common/Cloneable";

export interface Coordinate extends Equality {

    reset(): void;

    getX(): number;
    setX(x: number): void;
    getY(): number;
    setY(y: number): void;

    calcStraightLineDistance(other: Coordinate): number;

    getR(): number;
    setR(r: number): void;
    getPhi(): number;
    setPhi(phi: number): void;

    calcGreatCircleDistance(other: Coordinate): number;

}