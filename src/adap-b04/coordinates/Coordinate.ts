import { Equality } from "../common/Equality";
import { Cloneable } from "../common/Cloneable";
import { Printable } from "../common/Printable";

/**
 * A coordinate (here) is a point in a two-dimensional coordinate system.
 * The coordinate system may be cartesian or polar; coordinates should be interchangeable.
 */
export interface Coordinate extends Cloneable, Equality {

    /**
     * (Re)sets the coordinate to the origin of the coordinate system
     */
    reset(): void;

    /**
     * Gets and sets x and y in a two-dimensional cartesian coordinate system
     */
    getX(): number;
    setX(x: number): void;
    getY(): number;
    setY(y: number): void;

    /**
     * Returns the straight line distance between this and the other coordinate.
     * Expects that the other Coordinate instance is a valid Coordinate
     * @param other Target point
     */
    calcStraightLineDistance(other: Coordinate): number;

    /**
     * Gets and sets r and phi in a two-dimensional polar coordinate system
     * Expects that r >= 0 and 0 <= phi < 2*Math.PI
     */
    getR(): number;
    setR(r: number): void;
    getPhi(): number;
    setPhi(phi: number): void;

    /**
     * Returns the minimal distance on a circle between this and the other coordinate.
     * Expects that the other Coordinate instance is a valid Coordinate
     * @param other Target point
     */
    calcGreatCircleDistance(other: Coordinate): number;

    /**
     * Multiplies this coordinate with other coordinate (using polar coordinate system).
     * Expects that the other Coordinate instance is a valid Coordinate
     * @param other Multiplicator
     */
    multiplyWith(other: Coordinate): void;

}