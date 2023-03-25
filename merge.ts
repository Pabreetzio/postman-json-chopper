#!/usr/bin/env node

import fs from "fs";
import path from "path";

export function merge(inFile: string, outFile: string){
	let jsonObject = JSON.parse(fs.readFileSync(`${inFile}`).toString());
	let filePath = path.parse(inFile);
	var rootItem = {jsonObject:jsonObject, directory:filePath.dir}
	let itemQueue = [rootItem]
	while (itemQueue.length > 0){
		let currentItem = itemQueue.shift();
		if (typeof currentItem !== "undefined"){
			if (Array.isArray(currentItem.jsonObject.item)){
				for(let i = 0; i< currentItem.jsonObject.item.length; i++){
					let ref = currentItem.jsonObject.item[i]["$ref"];
					let subItemPath = ref.replace("#",currentItem.directory)
					let subItemDirectory = path.parse(subItemPath).dir;
					let subItemJsonObject = JSON.parse(fs.readFileSync(`${subItemPath}`).toString());
					let subItem = {
						jsonObject: subItemJsonObject,
						directory: subItemDirectory				
					}
					itemQueue.push(subItem);
					currentItem.jsonObject.item[i] = subItemJsonObject
				}
			}
		}
	}
	fs.writeFileSync(outFile, JSON.stringify(jsonObject, null, "\t"));
}
