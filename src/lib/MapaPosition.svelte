<script lang="ts">
	let { src, tauri } = $props();
	import { onMount } from 'svelte';
	import { getTauriUrl } from '../utils/utils';

	let newSrc = $state('');

	onMount(async () => {
		newSrc = await getUrl(src);
	});
	const getUrl = async (url: string) => {
		if (tauri) {
			let newUrl = await getTauriUrl('data/mapas', url);
			console.log(newUrl);
			//return '/assets/imgs/iconos/' + newUrl;
			return newUrl;
		} else {
			//const imgUrl = new URL('./assets/imgs/iconos/' + url, import.meta.url).href;
			return '/assets/mapas/' + url;
		}
	};
	$effect(() => {
		(async () => {
			console.log(src);
			newSrc = await getUrl(src);
		})();
	});
</script>

<div class="mapa">
	{#if src != ''}
		<img src={newSrc} alt="img" />
	{/if}
</div>

<!-- <img class="absolute top-0 rotate-180" src={sombra} alt="sombra" /> -->

<!-- <img class="absolute bottom-0" src={sombra} alt="sombra" /> -->

<style>
	.mapa {
		width: 1043px;
		height: 873px;
		top: 20px;
		left: -1px;
		position: absolute;
	}
</style>
