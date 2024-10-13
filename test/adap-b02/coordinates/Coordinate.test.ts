import { describe, it, expect } from "vitest";
import { Coordinate } from "../../src/adap-b02/coordinates/Coordinate";
import { CartesianCoordinate } from "../../src/adap-b02/coordinates/CartesianCoordinate";
import { PolarCoordinate } from "../../src/adap-b02/coordinates/PolarCoordinate";

describe('Straight-line distance computation tests', () => {
  it('test Cartesian to Cartesian', () => {
    let c1: Coordinate = new CartesianCoordinate(0, 0);
    let c2: Coordinate = new CartesianCoordinate(10, 10);
    const result = round(c1.calcStraightLineDistance(c2));
    const expected = round(Math.hypot(10, 10));
    expect(result).toBe(expected);
  });
    
  it('test Polar to Polar', () => {
    let c1: Coordinate = new PolarCoordinate(10, 0);
    let c2: Coordinate = new PolarCoordinate(10, Math.PI / 2);
    const result = round(c1.calcStraightLineDistance(c2));
    const expected = round(Math.hypot(10, 10));
    expect(result).toBe(expected);
  });

  it('test Cartesian to Polar', () => {
    let c1: Coordinate = new CartesianCoordinate(10, 0);
    let c2: Coordinate = new PolarCoordinate(10, Math.PI / 2);
    const result = round(c1.calcStraightLineDistance(c2));
    const expected = round(Math.hypot(10, 10));
    expect(result).toBe(expected);
  });

  it('test Polar to Cartesian', () => {
    let c1: Coordinate = new PolarCoordinate(10, 0);
    let c2: Coordinate = new CartesianCoordinate(0, 10);
    const result = round(c1.calcStraightLineDistance(c2));
    const expected = round(Math.hypot(10, 10));
    expect(result).toBe(expected);
  });
});

describe('Great circle distance computation tests', () => {
  it('test Cartesian to Cartesian', () => {
    let c1: Coordinate = new CartesianCoordinate(10, 0);
    let c2: Coordinate = new CartesianCoordinate(0, 10);
    const result = round(c1.calcGreatCircleDistance(c2));
    const expected = round(10 * Math.PI / 2);
    expect(result).toBe(expected);
  });
    
  it('test Polar to Polar', () => {
    let c1: Coordinate = new PolarCoordinate(10, 0);
    let c2: Coordinate = new PolarCoordinate(10, Math.PI / 2);
    const result = round(c1.calcGreatCircleDistance(c2));
    const expected = round(10 * Math.PI / 2);
    expect(result).toBe(expected);
  });

  it('test Cartesian to Polar', () => {
    let c1: Coordinate = new CartesianCoordinate(10, 0);
    let c2: Coordinate = new PolarCoordinate(10, Math.PI / 2);
    const result = round(c1.calcGreatCircleDistance(c2));
    const expected = round(10 * Math.PI / 2);
    expect(result).toBe(expected);
  });

  it('test Polar to Cartesian', () => {
    let c1: Coordinate = new PolarCoordinate(10, 0);
    let c2: Coordinate = new CartesianCoordinate(0, 10);
    const result = round(c1.calcGreatCircleDistance(c2));
    const expected = round(10 * Math.PI / 2);
    expect(result).toBe(expected);
  });
});

function round(v: number): number {
  return Math.round(10000 * v) / 10000;
}
