import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class QuantityUnit {
    
    protected value: number;
    protected unit: SIUnit;

    constructor(value: number, unit: SIUnit) {
        this.value = value;
        this.unit = unit;
    }

}

export enum BaseUnit {
    m = 0,
    kg = 1,
    s = 2,
    A = 3,
    K = 4,
    cd = 5,
    mol = 6
}

export class SIUnit {

    protected exponents: number[] = [0, 0, 0, 0, 0, 0, 0];

    constructor(exponents: number[]) {
        this.exponents = [...exponents];
    }

    public isEqual(other: SIUnit): boolean {
        return this.exponents.every((v, i) => v === other.exponents[i]);
    }

    public add(other: SIUnit): SIUnit {
        IllegalArgumentException.assert(!other.isEqual(this));
        return new SIUnit(this.exponents);
    }

    public multiply(other: SIUnit): SIUnit {
        let result: number[] = [0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < this.exponents.length; i++) {
            result[1] = this.exponents[i] + other.exponents[i];
        };
        return new SIUnit(result);
    }

}

export function calculateDuration2(distance: number, speed: number): QuantityUnit {
    IllegalArgumentException.assert(speed != 0);
    return new QuantityUnit(distance / speed, new SIUnit([0, 0, 1, 0, 0, 0, 0]));
}
