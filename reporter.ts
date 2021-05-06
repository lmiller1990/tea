import chalk from "chalk";
import { Suite, Test } from "./types";

export function reporterDescribe(suite: Suite) {
  if (suite.depth === 0) {
    console.log()
  }
  console.log("  ".repeat(suite.depth) + suite.title);
}

export function reporterItOnly(suite: Suite, test: Test) {
  console.log(
    "  ".repeat(suite.depth) + "  " + chalk.yellow("○") + ` ${test.title}`
  );
}

export function reporterIt(suite: Suite, test: Test) {
  const symbol = test.result.pass ? chalk.green("✔") : chalk.red("✗");
  console.log("  ".repeat(suite.depth) + "  " + symbol + ` ${test.title}`);
}
