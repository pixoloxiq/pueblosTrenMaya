<script lang="ts">
	let { src, tauri, actual, is360 } = $props();
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import sombra from '../assets/imgs/sombra.svg';
	import { getTauriUrl } from '../utils/utils';

	let newSrc = $state('');

	onMount(async () => {
		newSrc = await getUrl(src);
	});
	const getUrl = async (url: string) => {
		if (tauri) {
			let newUrl = await getTauriUrl('data/imgs', url);
			console.log(newUrl);
			//return '/assets/imgs/iconos/' + newUrl;
			return newUrl;
		} else {
			//const imgUrl = new URL('./assets/imgs/iconos/' + url, import.meta.url).href;
			return '/assets/imgs/' + url;
		}
	};
</script>

<div class="imgContainer">
	{#key actual}
		<img
			in:scale={{ duration: 2500, start: 1.05 }}
			src={newSrc}
			alt="img"
			class={is360 ? 'blur-xl' : ''}
		/>
	{/key}
</div>
{#if is360}
	<div class="absolute top-0 w-full h-ful blur-3xl"></div>
{/if}

<img class="absolute top-0 rotate-180" src={sombra} alt="sombra" />
<img class="absolute bottom-0" src={sombra} alt="sombra" />

<style>
	.imgContainer {
		width: 2160px;
		height: 3840px;
		overflow: hidden;
	}
</style>
