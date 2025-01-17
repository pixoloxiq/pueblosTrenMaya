import { json } from '@sveltejs/kit';
import { convertFileSrc } from '@tauri-apps/api/core';
import { appDataDir, desktopDir, documentDir, join, normalize } from '@tauri-apps/api/path';
import { BaseDirectory, exists, readDir, readTextFile } from '@tauri-apps/plugin-fs';
//const resourcePath = await resolveResource('script.sh');
/* const images_in_cache = await readDir(
  'images',
  {
    baseDir: BaseDirectory.AppCache,
  }
);
 */



async function processEntriesRecursively(parent:string, entries: any) {
	for (const entry of entries) {
		console.log(`Entry: ${entry.name}`);
		if (entry.isDirectory) {
        const dir = await join(parent, entry.name);
				processEntriesRecursively(dir, await readDir(dir, { baseDir: BaseDirectory.Desktop }))
		}
	}
}
export const readFileNil =  () => {
}
export const readFile = async () => {
	
	const dir = "data"
	let entries;
	try{
		//entries = await readDir('data', { baseDir: BaseDirectory.Desktop });
		//await processEntriesRecursively(dir, entries);

		const result = await readTextFile('data/pueblos.json', {
      baseDir: BaseDirectory.Desktop,
    });
		console.log(json(result));
		//return json(result);
		return { props: { Post: json(result) } };

	}catch(error){
		console.log(`no entries ${error}`);
	}
	

	

	/* let image_list= [];
	images_in_cache.forEach(async (entry) => {
		console.log(`Entry: ${entry.name}`);
		if (entry.isDirectory) {
			const dir = await join(parent, entry.name);
			processEntriesRecursively(dir, await readDir(dir, { baseDir: BaseDirectory.AppLocalData }))
    }
  image_list.push(convertFileSrc(entry.path)); // convertFileSrc() used here
}); */

const appDataDirPath = await appDataDir();
	const documentDirPath = await documentDir();




	

	const filePath = await join(appDataDirPath, 'assets/video.mp4');
const assetUrl = convertFileSrc(filePath);
try {
await exists('avatar.png', { baseDir: BaseDirectory.AppData });
} catch (error) {
console.error('Error checking file existence:', error);
}
console.log(assetUrl);
	
	const path = await normalize('../pueblos/src/utils/utils.js');
	console.log( await appDataDir())
	console.log(BaseDirectory.AppData);
	console.log(path);

  try {
    const result = await readTextFile('data/example.csv', {
      baseDir: BaseDirectory.Desktop,
    });
    console.log('File content:', result);
    return result;
  } catch (error) {
    console.error('Error reading file:', error);
    return false;
  }
};

export const loadFile = async () => {
	try{
		const Post = await import ('../data/pueblos.json')
		console.log(Post);
		return {props: {Post}}
	}catch(error){
		console.error('Error reading file:', error);
		return false;
	}
}

export const getTauriUrl = async (subPath:string, url:string) => {
	const desktopDirPath = await desktopDir();
	//const appDataDirPath = await appDataDir();
	//const documentDirPath = await documentDir();
	const filePath = await join(desktopDirPath, subPath,url);
	console.log(filePath);
	const assetUrl = await convertFileSrc(filePath);
	console.log(`assetUrl${assetUrl}`);
	return assetUrl;
}

//export const documentDirPath = await appLocalDataDir();