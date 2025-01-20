<script lang="ts">
	let { src, tauri, resetTimer } = $props();
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
				navbar: [],
				container: viewerEl,
				panorama: newSrc,
			});

			viewer.addEventListener('ready', () => {
				console.log('ready');
				ready = true;
			});
			viewer.addEventListener('position-updated', () => {
				console.log('PositionUpdatedEvent');
				resetTimer();
			});
		}
	});

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
		height: 1500px;
		position: absolute;
		top: 220px;
		opacity: 0;
		transition: all 0.2s ease-in-out;
		z-index: 100;
	}
	#viewer.ready {
		opacity: 1;
	}
</style>
