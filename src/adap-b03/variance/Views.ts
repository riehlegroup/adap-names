import { User, Moderator, Administrator } from "./Users";

class UserView {

    protected user: User = new User();

    constructor(user?: User) {
        if(user != undefined) this.user = user;
    }

    public getUser(): User {
        return this.user;
    }

    public setUser(user: User): void {
        this.user = user;
    }
    
}

class ModeratorView extends UserView {

    constructor(mod?: Moderator) {
        super(mod);
    }

    // Covariant redefinition of return type is allowed
    public getUser(): Moderator {
        return this.user as Moderator;
    }

    // Covariant redefinition of argument type (why is this allowed?)
    public setUser(user: Moderator): void {
        this.user = user;
    }

}

/**
 * Example for covariant redefinition of return type
 */
let modView1: ModeratorView = new ModeratorView(new Moderator());
let modAsUserView1: UserView = modView1 as UserView;
let mod1: Moderator = modAsUserView1.getUser() as Moderator;
mod1.moderate(); // should work, no problem

/**
 * Example for covariant redefinition of argument type
 */
let modView2: ModeratorView = new ModeratorView(new Moderator());
let modAsUserView2 = modView2 as UserView;
modAsUserView2.setUser(new User()); // sets up for failure
let mod2: Moderator = modView2.getUser(); // creates failure point
mod2.moderate(); // should fail because mod2 is of dyanmic type User

class AdministratorView extends ModeratorView {

    constructor(admin?: Administrator) {
        super(admin);
    }

    // @ts-expect-error Contravariant redefinition of return type not allowed
    public getUser(): User {
        return this.user;
    }

    // Contravariant redefinition of argument type is allowed
    public setUser(user: User): void {
        this.user = user;
    }

}

/**
 * Example for contravariant redefinition of return type
 */
let adminView: AdministratorView = new AdministratorView();
let adminViewAsModView1: ModeratorView = adminView as ModeratorView;
let mod3: Moderator = adminViewAsModView1.getUser();
mod3.moderate() // will fail because mod3 is of dynamic type User

/**
 * Example 1 for contravariant redefinition of argument type
 */
adminView.setUser(new User());
let user1: User = adminView.getUser();
user1.use(); // no problem
let admin1: Administrator = user1 as Administrator;
admin1.administer(); // will fail but also was not promised

/**
 * Example 2 for contravariant redefinition of argument type
 */
adminView.setUser(new Administrator());
let user2: User = adminView.getUser();
user2.use(); // still no problem
let admin2: Administrator = user2 as Administrator;
admin2.administer(); // will work but only because of extra knowledge
