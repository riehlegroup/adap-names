import { describe, it, expect } from "vitest";

import { Coordinate } from "../../../src/adap-b06/coordinates/Coordinate";
import { CartesianCoordinate } from "../../../src/adap-b06/coordinates/CartesianCoordinate";
import { PolarCoordinate } from "../../../src/adap-b06/coordinates/PolarCoordinate";

describe("Equality test", () => {
  it("test isEqual", () => {
    let c1: Coordinate = new CartesianCoordinate(0, 0);
    let p1: Coordinate = new PolarCoordinate(0, 0);
    expect(c1.isEqual(p1)).toBe(true);
    expect(c1.getHashCode() == p1.getHashCode()).toBe(true);

    c1 = c1.setX(2);
    p1 = p1.setR(2);
    expect(c1.isEqual(p1)).toBe(true);
    expect(c1.getHashCode() == p1.getHashCode()).toBe(true); 

    c1 = c1.setY(1);
    p1 = p1.setPhi(Math.PI / 2);
    expect(c1.isEqual(p1)).toBe(false);
    expect(c1.getHashCode() == p1.getHashCode()).toBe(false); 
  });
});


