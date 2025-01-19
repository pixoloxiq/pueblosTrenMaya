<script lang="ts">
	let { src, tauri, actual, is360, marginTop } = $props();
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import fondo from '../assets/imgs/fondo_sitios_0.jpg';
	import { getTauriUrl } from '../utils/utils';

	let newSrc = $state('');
	let loaded = $state(false);

	function handleLoad() {
		loaded = true;
	}

	onMount(async () => {
		//newSrc = await getUrl(src);
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
	function handleError() {
		loaded = false;
	}
</script>

<div class="flex flex-wrap content-center justify-center imgContainer">
	{#await getUrl(src)}
		<!-- promise is pending -->
		<p>waiting for the promise to resolve...</p>
	{:then value}
		<!-- promise was fulfilled or not a Promise -->
		{#key actual}
			<img
				style="margin-top: {marginTop}px"
				in:scale={{ duration: 2500, start: 1.05 }}
				src={value}
				alt="img"
				class="{is360 ? 'blur-xl' : ''} {loaded ? 'isLoaded' : ''}"
				onerror={handleError}
				onload={handleLoad}
			/>
		{/key}
	{:catch error}
		<!-- promise was rejected -->
		<p>Something went wrong: {error.message}</p>
	{/await}
	<!-- {#if newSrc != ''}
		{#key actual}
			<img in:scale={{ duration: 2500, start: 1.05 }} src={newSrc} alt="img" class={is360 ? 'blur-xl' : ''} />
		{/key}
	{/if} -->
</div>
{#if is360}
	<div class="absolute top-0 w-full h-ful blur-xl"></div>
{/if}

<!-- <img class="absolute top-0 rotate-180" src={sombra} alt="sombra" /> -->
<img class="absolute bottom-0 h-fit fondo" src={fondo} alt="fondo" />

<!-- <img class="absolute bottom-0" src={sombra} alt="sombra" /> -->

<style>
	.imgContainer {
		width: 2160px;
		/* height: 3840px; */
		height: 1850px;
		overflow: hidden;
		background-color: black;
		img {
			opacity: 0;
			margin-top: var(--margin-top, '0px');
			&.isLoaded {
				opacity: 1;
			}
		}
	}
</style>
