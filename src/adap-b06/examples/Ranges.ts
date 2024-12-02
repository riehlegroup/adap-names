export class RangeBound<T> {

    protected value: T;
    protected inclusive: boolean;

    constructor(value: T, inclusive: boolean) {
        this.value = value;
        this.inclusive = inclusive;
    }

    public getValue(): T {
        return this.value;
    }

    public isInclusive(): boolean {
        return this.inclusive;
    }

}

export class Range<T> {

    protected lowerBound: RangeBound<T>;
    protected upperBound: RangeBound<T>;

    constructor(lowerBound: RangeBound<T>, upperBound: RangeBound<T>) {
        this.lowerBound = lowerBound;
        this.upperBound = upperBound;
    }

    public includes(value: T): boolean {
        let lowerValue = this.lowerBound.getValue();
        let upperValue = this.upperBound.getValue();
        return true; // @todo
    }


    public getLowerBound(): RangeBound<T> {
        return this.lowerBound;
    }

    public getUpperBound(): RangeBound<T> {
        return this.upperBound;
    }

}
