import { describe, it, expect } from 'vitest';
import { StringName } from '../../../src/adap-b06/names/StringName';
import { StringArrayName } from '../../../src/adap-b06/names/StringArrayName';
import { IllegalArgumentException } from '../../../src/adap-b06/common/IllegalArgumentException';

describe("Basic naming test for StringName", () => {
    it("throws an exception when null is passed to the constructor", () => {
        expect(() => new StringName(null as any, "/")).toThrow(IllegalArgumentException);
    });

    it("creates a valid instance with non-null arguments", () => {
        const name: StringName = new StringName("validName", "/");
        expect(name.asString()).toBe("validName");
    });
});

describe("Basic naming test for StringArrayName", () => {
    it("throws an exception when empty list is passed to the constructor", () => {
        expect(() => new StringArrayName([], "/")).toThrow(IllegalArgumentException);
    });

    it("creates a valid instance with non-empty arguments", () => {
        const name: StringArrayName = new StringArrayName(["validName"], "/");
        expect(name.asString()).toBe("validName");
    });
});



