export class User {

    constructor(source?: User) {
        // if applicable, copy fields
    }

    public clone(): User {
        return new User(this);
    }

    public use(): void {
        // do something
    }

}

export class Moderator extends User {

    public clone(): Moderator {
        return new Moderator(this);
    }

    public moderate(): void {
        // do something
    }

}

export class Administrator extends Moderator {

    public clone(): Administrator {
        return new Administrator(this);
    }

    public administer(): void {
        // do something
    }

}
