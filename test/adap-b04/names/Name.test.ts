import { describe, it, expect } from "vitest";

import { Name } from "../../../src/adap-b04/names/Name";
import { StringName } from "../../../src/adap-b04/names/StringName";
import { StringArrayName } from "../../../src/adap-b04/names/StringArrayName";
import { IllegalArgumentException } from "../../../src/adap-b04//common/IllegalArgumentException";

describe("Basic StringName function tests", () => {
    it("test insert", () => {
        let n: Name = new StringName("oss.fau.de");
        n.insert(1, "cs");
        expect(n.asString()).toBe("oss.cs.fau.de");
    });
    it("test append", () => {
        let n: Name = new StringName("oss.cs.fau");
        n.append("de");
        expect(n.asString()).toBe("oss.cs.fau.de");
    });
    it("test remove", () => {
        let n: Name = new StringName("oss.cs.fau.de");
        n.remove(0);
        expect(n.asString()).toBe("cs.fau.de");
    });
});

describe("Basic StringArrayName function tests", () => {
    it("test insert", () => {
        let n: Name = new StringArrayName(["oss", "fau", "de"]);
        n.insert(1, "cs");
        expect(n.asString()).toBe("oss.cs.fau.de");
    });
    it("test append", () => {
        let n: Name = new StringArrayName(["oss", "cs", "fau"]);
        n.append("de");
        expect(n.asString()).toBe("oss.cs.fau.de");
    });
    it("test remove", () => {
        let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
        n.remove(0);
        expect(n.asString()).toBe("cs.fau.de");
    });
});

describe("Delimiter function tests", () => {
    it("test insert", () => {
        let n: Name = new StringName("oss#fau#de", '#');
        n.insert(1, "cs");
        expect(n.asString()).toBe("oss#cs#fau#de");
    });
});

describe("Escape character extravaganza", () => {
    it("test escape and delimiter boundary conditions", () => {
        let n: Name = new StringName("oss.cs.fau.de", '#');
        expect(n.getNoComponents()).toBe(1);
        expect(n.asString()).toBe("oss.cs.fau.de");
        n.append("people");
        expect(n.asString()).toBe("oss.cs.fau.de#people");
    });
});

describe("Escape character parade", () => {
    it("more tests!", () => {
        let n: Name = new StringName("m.y,n\\,a\\\\m\\.e", ",");
        let n2: Name = new StringArrayName(["m.y", "n\\,a\\\\m\\.e"], ",");
        // [ m.y | n\,a\\m\.e ] (esc)
        // [ m.y | n,a\m.e ] (un-esc)
        expect(n.asDataString()).toBe("m\\.y.n,a\\\\m\\\\.e")
        expect(n2.asDataString()).toBe("m\\.y.n,a\\\\m\\\\.e")
        console.log(n.asString())
    });

});
describe("Precondition perfection", () => {
    it("Delimiters that do not delimit", () => {
        expect(() => {
            new StringName("", null);
        }).toThrow(new IllegalArgumentException("null or undefined"))
        expect(() => {
            new StringArrayName("", null);
        }).toThrow(new IllegalArgumentException("null or undefined"))
    })
    it("invalid others", () => {
        expect(() => {
            new StringName(null);
        }).toThrow(new IllegalArgumentException("null or undefined"))
        expect(() => {
            new StringArrayName(null);
        }).toThrow(new IllegalArgumentException("null or undefined"))
    })
    it("More invalid others", () => {
        let n: Name = new StringName("");
        expect(() => {
            n.append("....");
        }).toThrow(new IllegalArgumentException("Component can not contain unescaped delimiters"))
        expect(() => {
            n.append(null);
        }).toThrow(new IllegalArgumentException("null or undefined"))

        let n2: Name = new StringArrayName([]);
        expect(() => {
            n2.append("....");
        }).toThrow(new IllegalArgumentException("Component can not contain unescaped delimiters"))
        expect(() => {
            n2.append(null);
        }).toThrow(new IllegalArgumentException("null or undefined"))
    })

    it("Invalid Indexes", () => {
        let n: Name = new StringName("");
        expect(() => {
            n.insert(-1, "test");
        }).toThrow(new IllegalArgumentException("Index out of bounds"))
        expect(() => {
            n.insert(null, "test");
        }).toThrow(new IllegalArgumentException("null or undefined"))

        let n2: Name = new StringArrayName([]);
        expect(() => {
            n2.insert(-1, "test");
        }).toThrow(new IllegalArgumentException("Index out of bounds"))
        expect(() => {
            n2.insert(7, "test");
        }).toThrow(new IllegalArgumentException("Index out of bounds"))
    })
})
