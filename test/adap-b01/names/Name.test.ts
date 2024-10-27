import { describe, it, expect } from "vitest";
import { Name } from "../../../src/adap-b01/names/Name";

describe("Basic initialization tests", () => {
  it("test construction 1", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    expect(n.asNameString()).toBe("oss.cs.fau.de");
  });
});

describe("Basic function tests", () => {
  it("test insert", () => {
    let n: Name = new Name(["oss", "fau", "de"]);
    n.insert(1, "cs");
    expect(n.asNameString()).toBe("oss.cs.fau.de");
  });
});

describe("Delimiter function tests", () => {
  it("test insert", () => {
    let n: Name = new Name(["oss", "fau", "de"], '#');
    n.insert(1, "cs");
    expect(n.asNameString()).toBe("oss#cs#fau#de");
  });
});

describe("Escape character extravaganza", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new Name(["oss.cs.fau.de"], '#');
    expect(n.asNameString()).toBe("oss.cs.fau.de");
    n.append("people");
    expect(n.asNameString()).toBe("oss.cs.fau.de#people");
  });
});

describe("custom tests", () => {

    it("test asNameString", () => {
        let n: Name = new Name(["oss", "cs", "fau", "de"]);
        expect(n.asNameString()).toBe("oss.cs.fau.de")

        let n2: Name = new Name(["oss", "cs", "fau", "de"], "_");
        expect(n2.asNameString()).toBe("oss_cs_fau_de")

        let n3: Name = new Name(["oss.cs", "fau.de"]);
        expect(n3.asNameString()).toBe("oss\\.cs.fau\\.de")

        let n4: Name = new Name(["oss.cs", "fau.de"]);
        expect(n4.asNameString("@")).toBe("oss.cs@fau.de")

        let n5: Name = new Name(["oss@cs", "fau@de"]);
        expect(n5.asNameString("@")).toBe("oss\\@cs@fau\\@de")

        let n6: Name = new Name(["", "", ""]);
        expect(n6.asNameString()).toBe("..");
    });

    it("test getComponent", () => {
        let n: Name = new Name(["oss", "cs", "fau", "de"]);
        expect(n.getComponent(0)).toBe("oss");
        expect(n.getComponent(3)).toBe("de");
        // out of index:
        expect(() => n.getComponent(4)).toThrowError();
        expect(() => n.getComponent(-1)).toThrowError();
    });

    it("test setComponent", () => {
       let n: Name = new Name(["oss", "cs", "fau", "de"]);
       n.setComponent(0, "cip");
       expect(n.asNameString()).toBe("cip.cs.fau.de");

       let n2: Name = new Name(["oss", "cs", "fau", "de"]);
       n2.setComponent(3, "org");
       expect(n2.asNameString()).toBe("oss.cs.fau.org");

       let n3: Name = new Name(["oss", "cs", "fau", "de"]);
       expect(() => n3.setComponent(4, "spam")).toThrowError();

       let n4: Name = new Name(["oss", "cs", "fau", "de"]);
       expect(() => n4.setComponent(-1, "spam")).toThrowError();
    });

    it("test getNoComponents", () => {
       let n: Name = new Name([]);
        expect(n.getNoComponents()).toBe(0);

        let n1: Name = new Name(["oss"]);
        expect(n1.getNoComponents()).toBe(1);
        
        let n2: Name = new Name(["oss", "cs", "fau", "de"]);
        expect(n2.getNoComponents()).toBe(4);
    });

    it("test insert", () => {
      let n: Name = new Name([]);
      n.insert(0, "oss");
      expect(n.asNameString()).toBe("oss");

       let n2: Name = new Name(["oss", "cs", "de"]);
       n2.insert(2, "fau");
       expect(n2.asNameString()).toBe("oss.cs.fau.de")

       let n3: Name = new Name(["oss", "cs", "fau"]);
       n3.insert(3, "de");
       expect(n3.asNameString()).toBe("oss.cs.fau.de")

      let n4: Name = new Name([]);
      expect(() => n4.insert(1, "oss")).toThrowError();

      let n5: Name = new Name([]);
      expect(() => n5.insert(-1, "oss")).toThrowError();
    })

    it("test append", () => {
        let n: Name = new Name([]);
        n.append("oss");
        expect(n.asNameString()).toBe("oss")

        let n2: Name = new Name(["oss", "cs", "fau"]);
        n2.append("de");
        expect(n2.asNameString()).toBe("oss.cs.fau.de")
    });

    it("test remove", () => {
        let n: Name = new Name(["oss", "cs", "fau", "de"]);
        n.remove(3); 
        expect(n.asNameString()).toBe("oss.cs.fau")

        let n2: Name = new Name(["oss", "cs", "fau", "de"]);
        n2.remove(0); 
        expect(n2.asNameString()).toBe("cs.fau.de")

        let n3: Name = new Name(["oss", "cs", "fau", "de"]);
        expect(() => n3.remove(-1)).toThrowError();

        let n4: Name = new Name(["oss", "cs", "fau", "de"]);
        expect(() => n4.remove(27)).toThrowError(); 

        let n5: Name = new Name(["oss"]);
        n5.remove(0); 
        expect(n5.asNameString()).toBe("")
        // remove from empty name
        let n6: Name = new Name([]);
        expect(() => n6.remove(0)).toThrowError(); 
    });
});

