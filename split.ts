
import fs from "fs";
import path from "path";
import slug from "slug";

export function split(inFile: string, outFile: string){
	// read file to memory
	var col;
	try {
		col = JSON.parse(fs.readFileSync(inFile).toString());
	} catch (e) {
		console.info(e);
		process.exit(0);
	}

	var visitedNames = {};
	let outFilePath = path.parse(outFile);
	var itemQueue = [
		{
			jsonObject: col, 
			directory: outFilePath.dir, 
			fileName: outFilePath.name
		}
	]
	while (itemQueue.length > 0){
		var currentItem = itemQueue.shift();
		if (typeof currentItem !== "undefined"){
			if (Array.isArray(currentItem.jsonObject.item)){
				for(let i = 0; i < currentItem.jsonObject.item.length; i++){
					let subItemJsonObject = currentItem.jsonObject.item[i];
					let subItemDirectory = `${currentItem.directory}/${currentItem.fileName}`
					let subItemFileName = `${slug(subItemJsonObject["name"]).toLowerCase()}`;
					let filePath = `${subItemDirectory}/${subItemFileName}`
					if (filePath in visitedNames) {
						subItemFileName = `${subItemFileName}-${visitedNames[filePath]}` 
						filePath += `${subItemDirectory}/${subItemFileName}`;
					} else {
						visitedNames[filePath] = 1;
					}
					visitedNames[filePath]++;
					let subItem = {
						jsonObject: subItemJsonObject,
						directory: subItemDirectory,
						fileName: subItemFileName
					}
					itemQueue.push(subItem);
					let replacementReference = {"$ref": `#/${currentItem.fileName}/${subItem.fileName}.json`}
					currentItem.jsonObject.item[i] = replacementReference;
				}		
			}
			if (!fs.existsSync(currentItem.directory)){
				fs.mkdirSync(currentItem.directory);
			}
			let filePath = `${currentItem.directory}/${currentItem.fileName}.json`
			if (filePath in visitedNames) {
				filePath += `${currentItem.directory}/${currentItem.fileName}-${visitedNames[filePath]}.json`;
			} else {
				visitedNames[filePath] = 1;
			}
			visitedNames[filePath]++;
			fs.writeFileSync(filePath, JSON.stringify(currentItem.jsonObject, null, "\t"));
		}	
	}

}
