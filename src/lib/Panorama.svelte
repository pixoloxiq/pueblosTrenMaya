<script lang="ts">
	let { src, tauri, resetTimer, pitch, yaw } = $props();
	import { AutorotatePlugin } from '@photo-sphere-viewer/autorotate-plugin';
	import { Viewer } from '@photo-sphere-viewer/core';
	import { onMount } from 'svelte';
	import { getTauriUrl } from '../utils/utils';

	let newSrc = $state('');
	let viewerEl: HTMLElement;
	let ready = $state(false);

	onMount(async () => {
		newSrc = await getUrl(src);
		if (viewerEl) {
			let viewer = new Viewer({
				plugins: [
					[
						AutorotatePlugin,
						{
							autorotatePitch: `${pitch}deg`,
						},
					],
				],
				navbar: [],
				container: viewerEl,
				panorama: newSrc,
			});

			viewer.addEventListener(
				'ready',
				() => {
					console.log('ready');
					ready = true;
					//if (pitch && yaw ) {
					console.log(pitch, yaw);
					/* viewer.rotate({
						yaw: `${yaw}deg`,
						pitch: `${pitch}deg`,
					}); */
					waitAndRun(50, () => {
						viewer.rotate({
							yaw: `${yaw}deg`,
							pitch: `${pitch}deg`,
						});
					});
				},
				{ once: true }
			);
			viewer.addEventListener('position-updated', ({ position }) => {
				//console.log('PositionUpdatedEvent');
				//console.log(`new position is yaw: ${position.yaw} pitch: ${position.pitch}`);
				resetTimer();
			});
		}
	});
	async function waitAndRun(n: number, callback: () => void) {
		await new Promise((resolve) => setTimeout(resolve, n));
		callback();
	}

	const getUrl = async (url: string) => {
		if (tauri) {
			let newUrl = await getTauriUrl('data/360', url);
			console.log(newUrl);
			//return '/assets/imgs/iconos/' + newUrl;
			return newUrl;
		} else {
			//const imgUrl = new URL('./assets/imgs/iconos/' + url, import.meta.url).href;
			return '/assets/360/' + url;
		}
	};
</script>

<div bind:this={viewerEl} id="viewer" class={ready ? 'ready' : ''}></div>

<style>
	#viewer {
		width: 2160px;
		height: 1841px;
		position: absolute;
		top: 0px;
		opacity: 0;
		transition: all 0.2s ease-in-out;
		z-index: 10;
	}
	#viewer.ready {
		opacity: 1;
	}
</style>
