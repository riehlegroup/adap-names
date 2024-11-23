import { describe, it, expect } from "vitest";
import { Name } from "../../../src/adap-b03/names/Name";
import { StringName } from "../../../src/adap-b03/names/StringName";
import { StringArrayName } from "../../../src/adap-b03/names/StringArrayName";

describe("StringName core functionality validation", () => {
  it("validate insertion operation", () => {
    const instance: Name = new StringName("oss.fau.de");
    instance.insert(1, "cs");
    expect(instance.asString()).toEqual("oss.cs.fau.de");
  });

  it("validate append operation", () => {
    const instance: Name = new StringName("oss.cs.fau");
    instance.append("de");
    expect(instance.asString()).toEqual("oss.cs.fau.de");
  });

  it("validate removal operation", () => {
    const instance: Name = new StringName("oss.cs.fau.de");
    instance.remove(0);
    expect(instance.asString()).toEqual("cs.fau.de");
  });
});

describe("StringArrayName basic functionality checks", () => {
  it("verify insertion", () => {
    const obj: Name = new StringArrayName(["oss", "fau", "de"]);
    obj.insert(1, "cs");
    expect(obj.asString()).toEqual("oss.cs.fau.de");
  });

  it("verify appending", () => {
    const obj: Name = new StringArrayName(["oss", "cs", "fau"]);
    obj.append("de");
    expect(obj.asString()).toEqual("oss.cs.fau.de");
  });

  it("verify removal", () => {
    const obj: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    obj.remove(0);
    expect(obj.asString()).toEqual("cs.fau.de");
  });
});

describe("Delimiter-specific tests", () => {
  it("test with custom delimiter", () => {
    const custom: Name = new StringName("oss#fau#de", '#');
    custom.insert(1, "cs");
    expect(custom.asString()).toBe("oss#cs#fau#de");
  });
});

describe("Boundary cases with escape characters", () => {
  it("validate edge cases", () => {
    const n: Name = new StringName("oss.cs.fau.de", '#');
    expect(n.getNoComponents()).toEqual(1);
    expect(n.asString()).toBe("oss.cs.fau.de");
    n.append("people");
    expect(n.asString()).toBe("oss.cs.fau.de#people");
  });
});

describe("Empty name scenarios", () => {
  it("handle empty name scenarios", () => {
    const emptyName: Name = new StringName("");
    emptyName.remove(0);
    expect(emptyName.isEmpty()).toEqual(true);
    emptyName.append("oss");
    expect(emptyName.isEmpty()).toEqual(false);
  });
});

describe("Concatenation behavior", () => {
  it("concatenate two names", () => {
    const first: Name = new StringName("oss");
    const second: Name = new StringName("cs.fau.de");
    first.concat(second);
    expect(first.asString()).toEqual("oss.cs.fau.de");
  });
});

describe("Equality comparisons", () => {
  it("validate equality", () => {
    const a: Name = new StringName("oss.cs.fau.de");
    const b: Name = new StringName("oss.cs.fau.de");
    expect(a.isEqual(b)).toBeTruthy();
    b.remove(0);
    expect(a.isEqual(b)).toBeFalsy();
  });
});

describe("Clone integrity", () => {
  it("ensure cloning works correctly", () => {
    const original: Name = new StringName("oss.cs.fau.de");
    const copy: Name = original.clone() as Name;
    expect(original.isEqual(copy)).toBeTruthy();
    copy.remove(0);
    expect(original.isEqual(copy)).toBeFalsy();
  });
});

describe("Hash code comparison", () => {
  it("compare hash codes", () => {
    const objA: Name = new StringName("oss.cs.fau.de");
    const objB: Name = new StringName("oss.cs.fau.de");
    expect(objA.getHashCode()).toEqual(objB.getHashCode());
    objB.remove(0);
    expect(objA.getHashCode()).not.toEqual(objB.getHashCode());
  });
});

describe("StringArrayName delimiter-focused tests", () => {
  it("custom delimiter insertion", () => {
    const customArray: Name = new StringArrayName(["oss", "fau", "de"], '#');
    customArray.insert(1, "cs");
    expect(customArray.asString()).toBe("oss#cs#fau#de");
  });
});

describe("StringArrayName boundary tests", () => {
  it("escape and delimiter edge conditions", () => {
    const instance: Name = new StringArrayName(["oss", "cs", "fau", "de"], '#');
    expect(instance.getNoComponents()).toEqual(4);
    expect(instance.asString()).toBe("oss#cs#fau#de");
    instance.append("people");
    expect(instance.asString(".")).toEqual("oss.cs.fau.de.people");
  });
});

describe("Empty StringArrayName handling", () => {
  it("validate handling empty names", () => {
    const emptyArray: Name = new StringArrayName([], '#');
    expect(emptyArray.isEmpty()).toBeTruthy();
    emptyArray.append("oss");
    expect(emptyArray.isEmpty()).toBeFalsy();
  });
});

describe("StringArrayName concatenation behavior", () => {
  it("combine names", () => {
    const left: Name = new StringArrayName(["oss"], '#');
    const right: Name = new StringArrayName(["cs",
