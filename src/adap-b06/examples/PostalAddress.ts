export class PostalAddress {
    
    protected street: string;
    protected city: string;
    protected state: string;
    protected postalCode: string;
    protected country: string;

    constructor(st: string, city: string, state: string, pc: string, country: string) {
        this.street = st;
        this.city = city;
        this.state = state;
        this.postalCode = pc;
        this.country = country;
    }

}