<script lang="ts">
	import { onMount } from 'svelte';
	import { getTauriUrl } from '../utils/utils';
	let { src, label, tauri, selected, id } = $props();

	let newSrc = $state('');

	const getUrl = async (url: string) => {
		if (tauri) {
			let newUrl = await getTauriUrl('data/estaciones', url);
			console.log(newUrl);
			//return '/assets/imgs/estaciones/' + newUrl;
			return newUrl;
		} else {
			//const imgUrl = new URL('./assets/imgs/iconos/' + url, import.meta.url).href;
			return '/assets/estaciones/' + url;
		}
	};

	onMount(async () => {
		newSrc = await getUrl(src);
	});
</script>

<!-- src={newSrc} -->
<div id="item-{id}" class="icono {selected ? 'selected' : ''} relative w-max">
	<img src={newSrc} alt="icono estación" class="iconEstacionBg estacion" />
	<div class="absolute font-normal labelIcon">
		{label}
	</div>
</div>

<style>
	.icono {
		width: 154px;
		height: 154px;
		.estacion {
			width: 100%;
			height: 100%;
			transition: all 0.2s ease-in-out;
		}
		.labelIcon {
			transition: all 0.2s ease-in-out;
			font-size: 26px;
			font-weight: 400;
			text-align: center;
			bottom: -70px;
			width: 800px;
			left: -325px;
		}
	}
	.icono.selected {
		width: 240px;
		height: 240px;

		.labelIcon {
			font-size: 36px;
			font-weight: 600;
			bottom: -80px;
			left: -280px;
		}
	}
</style>
