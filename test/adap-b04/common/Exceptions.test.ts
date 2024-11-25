import { describe, it, expect } from "vitest";

import { IllegalArgumentException } from "../../../src/adap-b04/common/IllegalArgumentException";
import { MethodFailedException } from "../../../src/adap-b04/common/MethodFailedException";
import { InvalidStateException } from "../../../src/adap-b04/common/InvalidStateException";

describe("Asserting not null or undefined", () => {
  it("test asserIsNotNullOrUndefined", async () => {
    const m: string = "null or undefined";

    IllegalArgumentException.assertIsNotNullOrUndefined("hurray!");
    expect(() => IllegalArgumentException.assertIsNotNullOrUndefined(null)).toThrow(new IllegalArgumentException(m));

    MethodFailedException.assertIsNotNullOrUndefined("hurray!");
    expect(() => MethodFailedException.assertIsNotNullOrUndefined(null)).toThrow(new MethodFailedException(m));

    InvalidStateException.assertIsNotNullOrUndefined("hurray!");
    expect(() => InvalidStateException.assertIsNotNullOrUndefined(null)).toThrow(new InvalidStateException(m));
  });
});
