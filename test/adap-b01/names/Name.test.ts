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
    it("test getComponent", () => {
        let n: Name = new Name(["oss", "cs", "fau", "de"]);
        expect(n.getComponent(0)).toBe("oss");
        expect(n.getComponent(3)).toBe("de");
        // out of index:
        //expect(n.getComponent(4)).toBe(undefined);
        //expect(n.getComponent(-1)).toBe("de");
    });

    it("test append", () => {
        let n: Name = new Name([]);
        n.append("oss");
        n.append("cs");
        expect(n.getComponent(0)).toBe("oss")
        expect(n.getComponent(1)).toBe("cs")
        n.append("fau");
        expect(n.getComponent(2)).toBe("fau")
    });

    it("test remove", () => {
        let n: Name = new Name(["oss", "cs", "fau", "de"]);
        n.remove(3); 
        expect(n.asNameString()).toBe("oss.cs.fau")

        let n2: Name = new Name(["oss", "cs", "fau", "de"]);
        n2.remove(0); 
        expect(n2.asNameString()).toBe("cs.fau.de")

        //let n3: Name = new Name(["oss", "cs", "fau", "de"]);
        //n3.remove(-1); 
        //expect(n3.asNameString()).toBe("oss.cs.fau")

        //let n4: Name = new Name(["oss", "cs", "fau", "de"]);
        //n4.remove(27); 
        //expect(n4.asNameString()).toBe("oss.cs.fau.de")

        let n5: Name = new Name(["oss"]);
        n5.remove(0); 
        expect(n5.asNameString()).toBe("")
        // remove from empty name
        //let n6: Name = new Name([]);
        //n6.remove(0); 
        //expect(n6.asNameString()).toBe("")
    });

    it("test getNoComponents", () => {
       let n: Name = new Name([]);
        expect(n.getNoComponents()).toBe(0);

        let n1: Name = new Name(["oss"]);
        expect(n1.getNoComponents()).toBe(1);
        
        let n2: Name = new Name(["oss", "cs", "fau", "de"]);
        expect(n2.getNoComponents()).toBe(4);
    });

    //it("test setComponent", () => {
    //    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    //    n.setComponent(0, "cip");
    //    expect(n.asNameString()).toBe("cip.cs.fau.de");
    //    // invalid arguments
    //    n.setComponent(3, "org");
    //    expect(n.asNameString()).toBe("cip.cs.fau.org");
    //    n.setComponent(-1, "invalid");
    //    expect(n.asNameString()).toBe("cip.cs.fau.org");
    //    n.setComponent(4, "de");
    //    expect(n.asNameString()).toBe("cip.cs.fau.org.de");
    //
    //    n.setComponent(7, "gap");
    //    expect(n.asNameString()).toBe("cip.cs.fau.org.de...gap");
    //});

});

