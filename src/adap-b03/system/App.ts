import { ServiceMain } from "./ServiceMain";

function main(args: string[]) {
    let service: ServiceMain = new ServiceMain();
    service.run(args);
}

let args: string[] = process.argv;
args = args.slice(2);
main(args);
