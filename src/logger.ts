import { Service } from "typedi";
import chalk from "chalk";

@Service()
export class MyLogger {
    public log = (...args: any[]) => {
        if (typeof args[0] === "string") {
            args[0] = chalk.yellow(args[0]);
        }
        console.log.call(this, ...args);
    };
}
