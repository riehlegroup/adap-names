import { MyAppMain } from "./MyAppMain";

function main(args: string[]) {
    let appMain: MyAppMain = new MyAppMain();
    appMain.run(args);
}

let args: string[] = process.argv;
args = args.slice(2);
main(args);
