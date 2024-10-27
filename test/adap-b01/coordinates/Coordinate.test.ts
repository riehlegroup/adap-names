import { describe, it, expect } from "vitest";
import { Coordinate } from "../../../src/adap-b01/coordinates/Coordinate";

describe('Basic Coordinate function tests', () => {
  it('should compute straight-line distance', () => {
    let c1: Coordinate = new Coordinate(0, 0);
    let c2: Coordinate = new Coordinate(10, 10);
    const result = round(c1.calcStraightLineDistance(c2));
    const expected = round(Math.hypot(10, 10));
    expect(result).toBe(expected);
  });
});

describe("Method types", () => {
  it("Decorators", () => {
    let c: Coordinate = new Coordinate();
    interface typedMethod {
      (): any;
      methodtype: string;
    };
    expect((c.getX as typedMethod).methodtype).toBe("get-method");
  })
});

function round(v: number): number {
  return Math.round(10000 * v) / 10000;
}
