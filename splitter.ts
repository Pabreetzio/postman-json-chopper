#!/usr/bin/env node

import { split } from "./split";

const inFile = process.argv[2];
const outFile = process.argv[3];

if (process.argv.length !== 4) {
	console.error("Please specify all command line arguments:");
	console.error("split ./path/to/large_postman_collection.json ./path/to/postman_collection_with_refs.json");
	process.exit(1);
}

split(inFile, outFile)