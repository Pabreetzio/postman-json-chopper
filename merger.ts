#!/usr/bin/env node

import { merge } from './merge';

const inFile = process.argv[2];
const outFile = process.argv[3];

if (process.argv.length !== 4) {
	console.error("Please specify all command line arguments:");
	console.error("merge ./path/to/postman_collection_with_refs.json path/to/large_postman_collection.json");
	process.exit(1);
}

merge(inFile, outFile);