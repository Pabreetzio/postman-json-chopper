# Postman JSON Chopper
Postman JSON Chopper is a simple yet powerful Node.js tool designed to split up large Postman collection JSON files into smaller, more manageable files and folders. It can also merge these smaller files back together when needed. This makes working with large collections easier, especially when using version control systems like Git.

<!-- TODO:place a screenshot here -->

## Table of Contents
1. [Installation](/#Installation)
1. [Usage](/#Usage)
   - [Split](/#Split)
   - [Merge](/#Merge)
1. [Examples](/#Examples)
1. [Contributing](/#Contributing)
1. [License](/#License)

## Installation
To install Postman JSON Chopper, simply run the following command in your terminal:

```bash
npm i postman-json-chopper -g
```
This command installs the tool globally, making it accessible from any terminal instance.

## Usage
Postman JSON Chopper provides two main functions: split and merge.

### Split
To split a large Postman collection JSON file into smaller files and folders, use the following command:

```bash
postman-json-chopper split <input-file> <output-folder>
```
- `<input-file>`: Path to the JSON file you want to split.
- `<output-file>`: Path to the root file where the split files will referenced and stored relative to.

### Merge
To merge smaller Postman collection JSON files back into a single file, use the following command:

```bash
postman-json-chopper merge <input-file> <output-file>
```
`<input-file>`: Path to the root file referencing the split files.
`<output-file>`: Path to the JSON file where the merged content will be stored.

## Examples
Splitting a large JSON file:

```bash
postman-json-chopper split fileToBeSplit.json rootOfSplitFiles.json
```

Merging smaller JSON files:

```bash
postman-json-chopper merge rootOfSplitFiles.json mergedFile.json
```

<!-- TODO:place a screenshot here -->

## Contributing
We welcome contributions to improve Postman JSON Chopper. If you have any suggestions, bug reports or feature requests, please submit an issue or create a pull request.

## License
Postman JSON Chopper is released under the MIT License.
