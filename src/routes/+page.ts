/* import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	return {
		post: {
			title: `Title for ${params.slug} goes here`,
			content: `Content for ${params.slug} goes here`
		}
	};
}; */

import { convertFileSrc } from '@tauri-apps/api/core';
import { appDataDir, resolveResource } from '@tauri-apps/api/path';
import { BaseDirectory, copyFile, readDir, readTextFile } from '@tauri-apps/plugin-fs';
import type { PageLoad } from './$types';

type Lugar = {
	edo: string;
	nombre: { [key: string]: string };
	descripcion: { [key: string]: string };
	px: number;
	py: number;
	img360: string;
	icono?: string;
	index: number;
	indexSlide: number;
	info: boolean;
};

let image_list: string[] = [];

export const load: PageLoad = async ({ params }) => {
	let slideNum = 0;
	let lugaresFinal: Lugar[] = [];
	if ((window as any).__TAURI_INTERNALS__) {
		// Code that runs only in Tauri
		// For example, calling a Tauri command
		console.log('TAURI');
		//await copyFilesToAppDataDir();
		const result = await readTextFile('data/pueblos.json', {
			baseDir: BaseDirectory.Desktop,
		});
		let resultObject = JSON.parse(result);
		/* resultObject.lugares.forEach(function(item:{index:number}, index:number) {
			item.index = index;
		}); */
		console.log(resultObject);
		let data: { standbyTime: number; textos: any; videoUrl: string; lugares: any[] } = {
			standbyTime: resultObject.standbyTime,
			videoUrl: resultObject.videoUrl,
			textos: resultObject.textos,
			lugares: [],
		};

		for (var i = 0; i < resultObject.lugares.length; i++) {
			let newIndexSlide = 0;
			if (resultObject.lugares[i].info === true) {
				slideNum++;
				newIndexSlide = slideNum;
			}
			data.lugares.push({ ...resultObject.lugares[i], index: i + 1, indexSlide: newIndexSlide });
		}
		//getImgList();

		console.log(data);
		return { props: { data: data }, tauri: true };
		//retur

		//readFile();
	} else {
		// Code that runs in a normal browser
		// For example, fallback functionality
		console.log('NOT TAURI');
		try {
			const Post = await import(`../data/pueblos.json`);
			console.log(Post);
			/* let slideNum = 0;
			let lugaresFinal: Lugar[] = []; */
			let data: { standbyTime: number; textos: any; videoUrl: string; lugares: any[] } = {
				standbyTime: Post.default.standbyTime,
				textos: Post.default.textos,
				videoUrl: Post.default.videoUrl,
				lugares: [],
			};
			for (var i = 0; i < Post.default.lugares.length; i++) {
				//Post.default.lugares[i].index = i + 1;

				//Post.default.lugares[i] = { ...Post.default.lugares[i], index: i + 1 };
				let newIndexSlide = 0;
				if (Post.default.lugares[i].info === true) {
					slideNum++;
					newIndexSlide = slideNum;
				}
				data.lugares.push({ ...Post.default.lugares[i], index: i + 1, indexSlide: newIndexSlide });

				//console.log(i);
			}
			console.log(data);
			return { props: { data: data, tauri: false } };
		} catch (e) {
			return { props: { data: { heading: '404', content: 'Page not found' } } };
		}
	}

	return {
		data: {
			name: 'world',
		},
	};
};

const getImgList = async () => {
	const images_in_cache = await readDir('data/imgs', { baseDir: BaseDirectory.Desktop });
	console.log(images_in_cache);
	images_in_cache.forEach(async (entry) => {
		image_list.push(convertFileSrc(entry.name)); // convertFileSrc() used here
	});
	console.log(image_list);
};

const copyFilesToAppDataDir = async () => {
	//const assetPath = '/pueblos/src/assets'; // Replace with the actual path to your asset
	//const assetPath = '$RESOURCE/'; // Replace with the actual path to your asset
	const assetPath = await resolveResource('resources/data');
	const appDataPath = await appDataDir();
	const destPath = `${appDataPath}/copiedAsset`;
	try {
		await copyFile(assetPath, destPath);
		console.log('File copied successfully');
	} catch (error) {
		console.error('Error copying file:', error);
	}
	//await copyFile(assetPath, destPath, {  dir: BaseDirectory.AppData });
};
