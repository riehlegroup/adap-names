import { Equality } from "../common/Equality";
import { Cloneable } from "../common/Cloneable";
import { Printable } from "../common/Printable";

/**
 * A coordinate (here) is a point in a two-dimensional coordinate system.
 * The coordinate system may be cartesian or polar; coordinates should be interchangeable.
 */
export interface Coordinate extends Equality, Cloneable, Printable {

    /**
     * Returns the origin of the coordinate system
     */
    getOrigin(): Coordinate;

    /**
     * Gets and sets x and y in a two-dimensional cartesian coordinate system
     */
    getX(): number;
    setX(x: number): Coordinate;
    getY(): number;
    setY(y: number): Coordinate;

    /**
     * Returns the straight line distance between this and the other coordinate.
     * @param other Target point
     */
    calcStraightLineDistance(other: Coordinate): number;

    /**
     * Gets and sets r and phi in a two-dimensional polar coordinate system
     * Expects that 0 <= phi < 2*Math.PI
     */
    getR(): number;
    setR(r: number): Coordinate;
    getPhi(): number;
    setPhi(phi: number): Coordinate;

    /**
     * Returns the minimal distance on a circle between this and the other coordinate.
     * @param other Target point
     */
    calcGreatCircleDistance(other: Coordinate): number;

    /**
     * Multiplies this coordinate with other coordinate (using polar coordinate system).
     * @param other Multiplicator
     */
    multiplyWith(other: Coordinate): Coordinate;

}