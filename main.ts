#!/usr/bin/env node
// main.ts

// Import the file system module
import * as fs from "fs";
import * as path from "path";
import { split } from "./split";
import { merge } from "./merge";

interface ChopperConfig {
  mergedFile: string;
  splitFile: string;
}

function readConfigFile(configFilePath: string): ChopperConfig | null {
  if (fs.existsSync(configFilePath)) {
    const configFileContent = fs.readFileSync(configFilePath, "utf-8");
    return JSON.parse(configFileContent);
  }

  return null;
}

// Main function to process the command line arguments
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error("Error: Invalid number of arguments. Usage: node main.js [split|merge] <input> <output>");
    process.exit(1);
  }

  const action = args[0];
  let input: string;
  let output: string;

  if (args.length === 1 || args.length === 2) {
    let configFilePath = path.join(process.cwd(), "postman-json-chopper.json");
    if(args.length === 2){
      configFilePath = path.join(process.cwd(), args[1]);
      let directory = path.parse(configFilePath).dir
      process.chdir(directory);
    }
    const config = readConfigFile(configFilePath);

    if (config === null) {
      console.error("Error: postman-json-chopper.json file not found");
      process.exit(1);
    }

    input = action === "split" ? config.mergedFile : config.splitFile;
    output = action === "split" ? config.splitFile : config.mergedFile;
  } else if (args.length === 3) {
    input = args[1];
    output = args[2];
  } else {
    console.error("Error: Invalid number of arguments. Usage: node main.js [split|merge] <input> <output>");
    process.exit(1);
  }

  switch (action) {
    case "split":
      split(input, output);
      break;
    case "merge":
      merge(input, output);
      break;
    default:
      console.error("Error: Invalid action. Use 'split' or 'merge'");
      process.exit(1);
  }
}

main();