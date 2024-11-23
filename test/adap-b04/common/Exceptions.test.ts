import { describe, it, expect } from "vitest";

import { IllegalArgumentException } from "../../../src/adap-b04/common/IllegalArgumentException";
import { MethodFailureException } from "../../../src/adap-b04/common/MethodFailureException";
import { InvalidStateException } from "../../../src/adap-b04/common/InvalidStateException";

describe("Asserting not null or undefined", () => {
  it("test asserIsNotNullOrUndefined", async () => {
    const exMsg: string = "null or undefined";

    IllegalArgumentException.assertIsNotNullOrUndefined("hurray!");
    expect(() => IllegalArgumentException.assertIsNotNullOrUndefined(null)).toThrow(new IllegalArgumentException(exMsg));

    MethodFailureException.assertIsNotNullOrUndefined("hurray!");
    expect(() => MethodFailureException.assertIsNotNullOrUndefined(null)).toThrow(new MethodFailureException(exMsg));

    InvalidStateException.assertIsNotNullOrUndefined("hurray!");
    expect(() => InvalidStateException.assertIsNotNullOrUndefined(null)).toThrow(new InvalidStateException(exMsg));
  });
});
