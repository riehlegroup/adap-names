import { User, Moderator, Administrator } from "./Users";

class UserPanel {

    protected user: User = new User();

    public getUser(): User {
        return this.user;
    }

    public setUser(user: User): void {
        this.user = user;
    }
    
}

class ModeratorPanel extends UserPanel {

    // Covariant redefinition of return type is allowed
    public getUser(): Moderator {
        return this.user as Moderator;
    }

    // Covariant redefinition of method argument (should flag)
    public setUser(user: Moderator): void {
        this.user = user;
    }

}

let user = new User();
let moderatorPanel = new ModeratorPanel() as UserPanel;
moderatorPanel.setUser(user); // should flag

class AdministratorPanel extends ModeratorPanel {

    // @ts-expect-error Contravariant redefinition of return types not allowed
    public getUser(): User {
        return this.user;
    }

    // Contravariant redefinition of method argument is allowed
    public setUser(user: User): void {
        this.user = user;
    }

}

let administratorPanel = new AdministratorPanel();
administratorPanel.setUser(user);
let administrator = administratorPanel.getUser() as Administrator;
administrator.administer(); // should fail
